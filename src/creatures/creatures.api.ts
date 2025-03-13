import express, { NextFunction, Router } from "express"
import { Request, Response } from 'express'
import { createCreatures } from './creatures.factories'
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
        router.get("/", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const allCreatures = await this.models.creature.findAll()
                res.status(200)
                res.send(allCreatures)
            } catch (e) {
                next(e)
            }

        })

        router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
            const id = req.params.id

            try {
                const one = await this.models.creature.findByPk(id.toString())
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
                    ...createCreatures(1)[0],
                    ...body
                }
                console.log(c)
                try {
                    const success: any = await this.models.creature.create(c)
                    res.status(200)
                    res.send(`Creature created with id ${success.id}`)
                } catch (e: any) {
                    next(e)
                }
            } else {
                next("The POST json does not match the Schema -- Invalid Payload")
            }


        })
    }
}


