import { NextFunction, Request, Response } from "express"
import { ValidationError } from "sequelize"
import { parseValidationErrors } from "../errors/parser"

export default function (err: any, _req: Request, res: Response, _next: NextFunction) {
    let errors: string[] = []
    if (err instanceof ValidationError) {
        errors = parseValidationErrors(err)
    }
    res.status(400)
    res.json(res.json({ status: 'errors', code: 400, errors: errors }))
}
