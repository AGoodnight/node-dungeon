import { Sequelize } from "sequelize";
import { modelDict, modelNames, SModel } from "./data_layer.types";

export class DataLayer {

    models: modelDict

    constructor(private db: Sequelize, private modelDeclarations: SModel<any>[]) {
        this.models = {} as modelDict
        for (let m of this.modelDeclarations) {
            if (!Object.keys(modelNames).includes(m.name)) {
                return
            }
            const model = this.db.define(
                m.name,
                m.model,
                m.options
            )
            this.models[m.name as modelNames] = model
        }
    }
} 