import express from "express"
import { Request, Response } from 'express'
import { createCreatures } from './factories'

export const router = express.Router()

router.get("/random", (req: Request, res: Response) => {
    // if(req.query.amount)
    // req.query.amount ? parseInt(,10) :
    res.json(getCreatures(12))
})

router.get("/:id", (req: Request, res: Response) => {
    req.params.id
    res.json({
        id: req.params.id
    })
})

function getCreatures(amount: number) {
    return createCreatures(amount)
}

export default router