import { NextFunction, Request, Response } from 'express'
import chalk from 'chalk'

export function logger(req: Request, res: Response, next: NextFunction) {
    console.log(chalk.blue(req.body))
    next()
}