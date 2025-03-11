import { Sequelize } from "sequelize";
import { DataLayer } from "./data_layer";
import { SModel } from "./data_layer.types";

export class ORM {
    public sequelize;
    public dataModel;
    constructor(config: any, models: SModel<any>[]) {
        this.sequelize = new Sequelize(
            config.DB,
            config.USER,
            config.PASSWORD, {
            host: config.HOST,
            dialect: config.dialect,
            pool: {
                max: config.pool.max,
                min: config.pool.min,
                acquire: config.pool.acquire,
                idle: config.pool.idle
            }
        })
        this.dataModel = new DataLayer(this.sequelize, models)
    }
}