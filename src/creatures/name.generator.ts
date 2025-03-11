export function generateName(seed: number) {
    const names = ["Goblin", "Orc", "Elf", "Human", "Dragon"];
    const index = seed % names.length;
    return names[index];
}