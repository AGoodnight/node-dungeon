"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCreatures = createCreatures;
const name_generator_1 = require("./_generators/name.generator");
function createCreatures(amt) {
    const creatures = [];
    for (let i = 0; i < amt; i++) {
        const now = Date.now(); // Milliseconds since epoch
        const seed = Date.now(); // Using milliseconds as a simple seed
        const next = {
            ID: crypto.randomUUID(), // Using crypto.randomUUID()
            Alive: true,
            HitPoints: Math.floor(Math.random() * 10),
            Initiative: Math.floor(Math.random() * 3),
            X: Math.floor(Math.random() * 20),
            Y: Math.floor(Math.random() * 20),
            Category: "Creature",
            TimeCreated: now,
            TimeModified: now,
            Name: (0, name_generator_1.generateName)(seed), // Assuming you have a generateName function
        };
        creatures.push(next);
    }
    return creatures;
}
