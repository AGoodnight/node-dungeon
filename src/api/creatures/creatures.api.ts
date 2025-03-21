import express, { NextFunction } from "express"
import { Request, Response } from 'express'
import { ORM } from "../../model_repo/orm"
import { modelDict } from "../../model_repo/model_repo.types"
import { Creature } from "./creatures.types"
import { creatureBodyValidatorMW, creatureQueryValidatorMW } from "./creature.validator"
import { ValidationError } from "sequelize"


export class CreaturesAPI {
    models: modelDict
    router = express.Router();

    constructor(dl: ORM) {
        this.models = dl.dataModel.models
        this._create()
    }

    private async _queryCreatures(req: Request, res: Response, next: NextFunction) {
        const matchedCreatures = await this.models.creature.findAll({
            where: {
                ...req.query
            }
        });
        res.status(200);
        if (matchedCreatures.length > 0) {
            res.send(matchedCreatures);
        } else {
            res.send({ "message": "no creatures found" })
        }
    }

    private async _getAllCreatures(req: Request, res: Response, next: NextFunction) {
        const allCreatures = await this.models.creature.findAll();
        res.status(200);
        res.send(allCreatures);
    }

    private _create() {
        this.router.get("/", creatureQueryValidatorMW, (req: Request, res: Response, next: NextFunction) => {
            try {
                if (!req.query) {
                    this._getAllCreatures(req, res, next)
                } else {
                    this._queryCreatures(req, res, next)
                }
            } catch (e) {
                next(e)
            }
        })


        this.router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
            try {
                const id = req.params.id
                const queriedResource = await this.models.creature.findByPk(id.toString())
                if (!queriedResource) {
                    res.status(404)
                    res.json({ status: "errors", code: 404, errors: [`No Creature found with ID ${id}`] })
                }
                res.status(200)
                res.send(queriedResource)
            } catch (e) {
                next(e)
            }
        })

        this.router.post("/", creatureBodyValidatorMW, async (req: Request, res: Response, next: NextFunction) => {
            try {
                const body = req.body
                const creature = <Creature>{
                    id: crypto.randomUUID(),
                    ...body
                }
                const success: any = await this.models.creature.create(creature)
                res.status(200)
                res.send(`Creature created with id ${success.id}`)
            } catch (e: any) {
                next(e)
            }
        })
    }
}


