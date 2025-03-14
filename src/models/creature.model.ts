import { DataTypes } from "sequelize";
import { SModel } from "../dataLayer/model_repo.types";

export default <SModel<any>>{
    name: 'creature',
    model: {
        id: {
            type: DataTypes.UUID, // Or DataTypes.STRING, depending on your ID generation
            primaryKey: true,
        },
        alive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        hitpoints: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 10
        },
        initiative: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        x: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        y: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    },
    options: {
        tableName: 'creatures',
        timestamps: true,
        freezeTableName: true
    }
}



