import { NextFunction, Request, Response } from 'express'
import chalk from 'chalk'



export function logger(req: Request, _res: Response, next: NextFunction) {
    console.log(chalk.blue("\n-------- Logging Transaction ---------"))
    console.log(`Incoming Body: ${JSON.stringify(req.body)}`)
    console.log(`Incoming Parameters: ${JSON.stringify(req.params)}`)
    console.log(`Incoming Query: ${JSON.stringify(req.query)}`)
    console.log("\n")
    next()
}