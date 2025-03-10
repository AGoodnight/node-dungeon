type Creature = {
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

interface ICreature {
    Summon(): void;
    Kill(): void;
    IsAlive(): boolean;
    Damage(taken: number): [number, boolean]; // Returns a tuple (array)
}