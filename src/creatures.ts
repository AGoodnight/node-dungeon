import express from "express"
import { Request, Response } from 'express'
import { createCreatures } from './factories'

export const router = express.Router()

router.get("/random", (req: Request, res: Response) => {
    req.query.limit
    res.json(getCreatures())
})

router.get("/:id", (req: Request, res: Response) => {
    req.params.id
    res.json({
        id: req.params.id
    })
})

function getCreatures() {
    return createCreatures(10)
}

export default router