import express, { Request, Response } from "express"
import chalk from "chalk"
import { CreaturesAPI, router } from "./creatures/creatures.api"
import { logger } from "./middleware/logger"
import { Sequelize, Dialect } from "sequelize"
import { ORM } from './dataLayer/orm'
import creatureModels from './models/creature.model'
import errorHandler from "./middleware/error-handler"

const dbConfig = {
    HOST: "localhost",
    USER: "superuser",
    PASSWORD: "12345",
    DB: "dungeon",
    dialect: <Dialect>"postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

const app = express()
export const dl = new ORM(dbConfig, [
    creatureModels
])
app.use(express.json())
app.use("/creatures", new CreaturesAPI(dl, router).router)
app.use(logger)
app.use(errorHandler)

app.route("/")
    .get((_req: Request, res: Response) => {
        res.send("hello")
    })

app.listen(8080, () => {
    console.log(chalk.magenta("Syncing Database..."))
    dl.sequelize.sync()
    console.log(chalk.green("Running Server at localhost:8080"))
})
