import express, { NextFunction, Router } from "express"
import { Request, Response } from 'express'
import { createCreatures } from './creatures.factories'
import { dl } from "../server"
import { DataLayer } from "../dataLayer/data_layer"
import { ORM } from "../dataLayer/orm"

export const router = express.Router()

function getCreatures(amount: number) {
    return createCreatures(amount)
}

export class CreaturesAPI {
    constructor(private dl: ORM, public router: Router) {
        router.get("/random", (req: Request, res: Response) => {
            // if(req.query.amount)
            // req.query.amount ? parseInt(,10) :
            res.json(getCreatures(12))
        })

        router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
            const models = dl.dataModel.models
            const id = req.params.id

            try {
                const one = await models.Creature.findByPk(id.toString())
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
    }
}


