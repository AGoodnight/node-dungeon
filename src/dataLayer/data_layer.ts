import { Model, ModelStatic, Sequelize } from "sequelize";
import { SModel } from "./data_layer.types";

enum modelNames {
    Creature = "Creature"
}

type modelDict = Record<modelNames, ModelStatic<Model<any, any>>>

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