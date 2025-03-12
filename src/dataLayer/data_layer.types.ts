import { Attributes, Model, ModelAttributes, ModelOptions, ModelStatic } from "sequelize"

export enum modelNames {
    Creature = "Creature"
}

export type SModel<M extends Model, TAttributes = Attributes<M>> = {
    name: string,
    model: ModelAttributes<M, TAttributes>,
    options: ModelOptions<M>
}

export type modelDict = Record<modelNames, ModelStatic<Model<any, any>>>