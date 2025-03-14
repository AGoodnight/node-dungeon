import express, { Request, Response } from "express"
import chalk from "chalk"
import { CreaturesAPI } from "./creatures/creatures.api"
import { logger } from "./middleware/logger"
import { Sequelize, Dialect } from "sequelize"
import { ORM } from './model_repo/orm'
import creatureModels from './models/creature.model'
import errorHandler from "./middleware/error_handler"

// TODO: Export this later
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

// ORM ( data layer )
export const dl = new ORM(dbConfig, [
    creatureModels
])

// App Setup
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Use Logger
app.use(logger)

// Use API
app.use("/creatures", new CreaturesAPI(dl).router)

// Use Error Handling
app.use(errorHandler)

// Base Route
app.route("/")
    .get((_req: Request, res: Response) => {
        res.send("hello")
    })

// Start App
app.listen(8080, () => {
    console.log(chalk.magenta("Syncing Database..."))
    dl.sequelize.sync()
    console.log(chalk.green("Running Server at localhost:8080"))
})
