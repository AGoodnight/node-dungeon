import express, { Request, Response } from "express"
import chalk from "chalk"
import creatures from "./creatures"
import { logger } from "./middleware/logger"


const app = express()
app.use(logger)
app.use("/creatures", creatures)

app.route("/")
    .get((_req: Request, res: Response) => {
        res.send("hello")
    })

app.listen(8080, () => {
    console.log(chalk.green("Running Server on localhost:8080"))
})