import express, { Request, Response } from "express"
import chalk from "chalk"
import creatures from "./creatures"
import { logger } from "./middleware/logger"
import { Sequelize, Dialect, OperatorsAliases } from "sequelize"

const dbConfig = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "123456",
    DB: "dungeon",
    dialect: <Dialect>"postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

export const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
})

const app = express()
app.use(logger)
app.use("/creatures", creatures)

app.route("/")
    .get((_req: Request, res: Response) => {
        res.send("hello")
    })

app.listen(8080, () => {
    console.log(chalk.magenta("Syncing Database..."))
    sequelize.sync()
    console.log(chalk.green("Running Server at localhost:8080"))
})