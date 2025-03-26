import { NextFunction } from "express"
import { Request, Response } from 'express'
import { ORM } from "../../orm_layer/orm"
import { modelDict } from "../../orm_layer/model_repo.types"
import { CreatureGet, CreaturePost, CreaturePostResponse } from "./_types/creatures.types"

export class CreaturesController {
    models: modelDict

    constructor(
        orm: ORM
    ) {
        this.models = orm.dataModel.models
    }

    async getCreatures(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.query) {
                this._getAllCreatures(req, res, next)
            } else {
                this._queryCreatures(req, res, next)
            }
        } catch (e) {
            next(e)
        }
    }

    async getCreature(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const queriedResource = await this.models.creature.findByPk(id.toString())
            if (!queriedResource) {
                res.status(404)
                res.json({ status: "errors", code: 404, errors: [`No BaseCreature found with ID ${id}`] })
            }
            res.status(200)
            res.send(queriedResource)
        } catch (e) {
            next(e)
        }
    }

    async createCreature(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body
            const creature = <CreaturePost>{
                id: crypto.randomUUID(),
                ...body
            }
            const success: any = await this.models.creature.create(creature)
            res.status(200)
            res.send(`BaseCreature created with id ${success.id}`)
        } catch (e: any) {
            next(e)
        }
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
}


