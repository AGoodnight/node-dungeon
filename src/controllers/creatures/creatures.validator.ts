import Ajv from "ajv"
import { NextFunction, Request, Response } from "express"
import addFormats from 'ajv-formats';
import ajvErrors from 'ajv-errors';
import { creatureSchema, CreatureSchemaKeys } from "./schema/creature.schema";
import { parseAJVErrors } from "../../errors/parser";

const validator = new Ajv({
    allErrors: true
})
validator.addSchema(creatureSchema, "creature")
addFormats(validator);
ajvErrors(validator);

// use AJV to validate the body of the post
export const creatureBodyValidatorMW = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const validate = validator.getSchema("creature")

    if (req.body && validate) {
        const body = req.body
        const valid = validate(body)
        if (!valid && validate.errors) {
            const error = parseAJVErrors(validate.errors)
            res.status(400)
            res.json({ status: 'errors', code: 400, errors: error })
            return
        }
    }
    next();
}


// If no query keys match the creature schema, return a message.
// If at least one key matches, strip the invalid keys and continue
export const creatureQueryValidatorMW = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const query = req.query
    const validQueryKeys = []
    let errors: string[] = []
    if (query) {
        Object.keys(query).map((k: string) => {
            if (!CreatureSchemaKeys.includes(k)) {
                errors.push(`${k} is not a valid query key, `)
                delete query[k]
            } else {
                validQueryKeys.push(k)
            }
        })

        if (validQueryKeys.length < 1) {
            res.status(400)
            res.json({ status: 'errors', code: 400, errors: errors })
            return
        }
    }
    next();
}