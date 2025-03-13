export type Creature = {
    id: string;
    alive: boolean;
    hitpoints: number;
    initiative: number;
    x: number;
    y: number;
    category: string;
    name: string;
};

export interface ICreature {
    Summon(): void;
    Kill(): void;
    IsAlive(): boolean;
    Damage(taken: number): [number, boolean]; // Returns a tuple (array)
}