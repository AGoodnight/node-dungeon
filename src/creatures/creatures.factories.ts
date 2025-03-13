import { Creature } from "./creatures.types";
import { generateName } from "./name.generator";

export function createCreatures(amt: number) {
    const creatures = [];

    for (let i = 0; i < amt; i++) {
        const now = Date.now(); // Milliseconds since epoch
        const seed = Date.now(); // Using milliseconds as a simple seed

        const next = <Creature>{
            id: crypto.randomUUID(), // Using crypto.randomUUID()
            alive: true,
            hitpoints: Math.floor(Math.random() * 10),
            initiative: Math.floor(Math.random() * 3),
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20),
            category: "Creature",
            name: generateName(seed), // Assuming you have a generateName function
        };

        creatures.push(next);
    }

    return creatures;
}
