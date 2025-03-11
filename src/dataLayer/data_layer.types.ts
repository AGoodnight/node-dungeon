import { Attributes, Model, ModelAttributes, ModelOptions } from "sequelize"

export type SModel<M extends Model, TAttributes = Attributes<M>> = {
    name: string,
    model: ModelAttributes<M, TAttributes>,
    options: ModelOptions<M>
}