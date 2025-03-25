import { Sequelize } from "sequelize";
import { ModelRepo } from "./model_repo";
import { SModel } from "./model_repo.types";

export class ORM {
    public sequelize: Sequelize;
    public dataModel: ModelRepo;
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
        this.dataModel = new ModelRepo(this.sequelize, models)
    }
}