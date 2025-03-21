export type Creature = {
    id: string;
    name: string;
    alive: boolean;
    size: string;
    type: string;
    alignment: string;
    hp: number;
    initiative: number;
    category: string;
};

export interface ICreature {
    Summon(): void;
    Kill(): void;
    IsAlive(): boolean;
    Damage(taken: number): [number, boolean]; // Returns a tuple (array)
}