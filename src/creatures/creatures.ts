import express, { NextFunction, Router } from "express"
import { Request, Response } from 'express'
import { createCreatures } from './creatures.factories'
import { dl } from "../server"
import { DataLayer } from "../dataLayer/data_layer"
import { ORM } from "../dataLayer/orm"
import { modelDict } from "../dataLayer/data_layer.types"
import { Creature } from "./creatures.types"
import Ajv from "ajv/dist/2020"
import creatureSchema from '../schemas/creature.schema.json'

export const router = express.Router()

function getCreatures(amount: number) {
    return createCreatures(amount)
}

export class CreaturesAPI {
    models: modelDict
    _validator: Ajv
    constructor(private dl: ORM, public router: Router) {
        this.models = dl.dataModel.models
        this._validator = new Ajv()

        this._addSchemas()
        this._create()
    }

    private _addSchemas() {
        this._validator.addSchema(creatureSchema, "creature")
    }

    private _create() {
        router.get("/random", async (req: Request, res: Response) => {
            // if(req.query.amount)
            // req.query.amount ? parseInt(,10) :
            res.json(getCreatures(12))
        })

        router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
            const id = req.params.id

            try {
                const one = await this.models.Creature.findByPk(id.toString())
                if (!one) {
                    res.status(404)
                    res.send(`No Creature found with ID ${id}`)
                }
                res.status(200)
                res.send(one)
            } catch (e) {
                next(e)
            }
        })

        router.post("/", async (req: Request, res: Response, next: NextFunction) => {
            const body = req.body
            const validate = this._validator.getSchema("creature")

            if (!validate) {
                next("No Schema is associated with this payload -- Invalid Payload")
                return;
            }

            if (validate(body)) {
                const c = <Creature>{
                    ...body
                }
                try {
                    const response = await this.models.Creature.build(c)
                    console.log(response)
                    res.status(200)
                    res.send(`Creature created with id ${response.dataValues.ID}`)
                } catch (e) {
                    next(e)
                }
            } else {
                next("The POST json does not match the Schema -- Invalid Payload")
            }


        })
    }
}


