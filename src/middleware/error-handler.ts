import { NextFunction, Request, Response } from "express"

export default function (err: Error, _req: Request, res: Response, _next: NextFunction) {
    res.status(500)
    res.json({ error: err.message })
}
