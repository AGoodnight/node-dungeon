import { defineConfig } from 'orval';

export default defineConfig({
    creatures: {
        input: "./src/controllers/creatures/schema/creatures.openapi.yaml",
        output: {
            client: undefined,
            target: "./src/controllers/creatures/_types/creatures.types.ts",
        }
    }
})