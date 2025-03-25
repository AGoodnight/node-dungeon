export interface BaseCreature {
    id: string;
    name: string;
    alive: boolean;
    hp: number;
    initiative: number;
    category: string;
};

interface Monster extends BaseCreature {
}

export interface ICreature {
    Summon(): void;
    Kill(): void;
    IsAlive(): boolean;
    Damage(taken: number): [number, boolean]; // Returns a tuple (array)
}