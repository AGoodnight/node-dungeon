import { DataTypes } from "sequelize";
import { SModel } from "../../orm_layer/model_repo.types";

export default <SModel<any>>{
    name: 'creature',
    model: {
        id: {
            type: DataTypes.UUID, // Or DataTypes.STRING, depending on your ID generation
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        alive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 10
        },
        initiative: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    options: {
        tableName: 'creatures',
        timestamps: true,
        freezeTableName: true
    }
}



