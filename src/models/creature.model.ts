import { DataTypes } from "sequelize";
import { SModel } from "../dataLayer/data_layer.types";

export default <SModel<any>>{
    name: 'Creature',
    model: {
        ID: {
            type: DataTypes.UUID, // Or DataTypes.STRING, depending on your ID generation
            primaryKey: true,
            allowNull: false,
        },
        Alive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        HitPoints: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 10
        },
        Initiative: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        X: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        Y: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        Category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    options: {
        tableName: 'Creatures',
        timestamps: true,
    }
}

