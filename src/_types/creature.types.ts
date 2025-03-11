import { Sequelize, DataTypes, Model } from 'sequelize';
const db = new Sequelize()

export type Creature = {
    ID: string;
    Alive: boolean;
    HitPoints: number;
    Initiative: number;
    X: number;
    Y: number;
    Category: string;
    TimeCreated: number;
    TimeModified: number;
    Name: string;
};

export interface ICreature {
    Summon(): void;
    Kill(): void;
    IsAlive(): boolean;
    Damage(taken: number): [number, boolean]; // Returns a tuple (array)
}