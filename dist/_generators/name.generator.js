"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateName = generateName;
function generateName(seed) {
    const names = ["Goblin", "Orc", "Elf", "Human", "Dragon"];
    const index = seed % names.length;
    return names[index];
}
