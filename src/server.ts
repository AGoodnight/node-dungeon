import 'reflect-metadata';
import express, { Request, Response } from "express"
import chalk from "chalk"
import { CreaturesController } from "./controllers/creatures/creatures.controller"
import { logger } from "./middleware/logger"
import { Dialect } from "sequelize"
import { ORM } from './orm_layer/orm'
import creatureModels from './controllers/creatures/creature.model'
import errorHandler from "./middleware/error_handler"
import { creatureRoutes } from "./controllers/creatures/creatures.routes"
import { initialize } from "express-openapi"

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

// ORM
// For use by our controllers
export const orm = new ORM(dbConfig, [creatureModels])

// Controller Initialization
export const controllers = {
    CreaturesController: new CreaturesController(orm)
}

export const openAPIExpress = initialize({

})

// App Setup
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Use Logger
app.use(logger)

// Use API
// Factories return routes using the controllers
app.use("/creatures", creatureRoutes(controllers))

// Use Error Handling
app.use(errorHandler)

// Base Route
app.route("/")
    .get((_req: Request, res: Response) => {
        res.send("hello")
    })

// Start App
app.listen(8443, () => {
    console.log(chalk.magenta("Syncing Database..."))
    orm.sequelize.sync()
    console.log(chalk.green("Running Server at localhost:8443"))
})
