import { compile, compileFromFile } from 'json-schema-to-typescript'
import { mkdirSync, readdir, readdirSync, readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import chalk from 'chalk';

type ModuleDeclaration = {
    inputDir: string;
    outputDir: string;
    outputName: string;
}

const controllerModules: ModuleDeclaration[] = [
    {
        inputDir: "src/controllers/creatures/schema",
        outputDir: "src/controllers/creatures/_types",
        outputName: "creatures"
    },
    {
        inputDir: "src/controllers/skills/schema",
        outputDir: "src/controllers/skills/_types",
        outputName: "skills"
    }
]

controllerModules.forEach((module) => processModule(module))

function processModule(module: ModuleDeclaration) {
    readdir(module.inputDir, (_e, f) => {
        const _paths: string[] = []
        f.map((name: string) => {
            const pattern = /.*\.schema\.json$/
            if (!pattern.test(name)) {
                return
            }
            _paths.push(`${module.inputDir}/${name}`)
        })
        readFiles(module, _paths)
    });
}

async function readFiles(module: ModuleDeclaration, paths: string[]) {
    const reducer = async (previousValue: Promise<string[]>, currentValue: string, _index: number) => {
        const compiled = await compileFromFile(
            currentValue,
            {
                bannerComment: `// Auto generated file, run npm run generate:${module.outputName}:ts to rebuild. Do not modify directly.`
            }
        )
        const files = await previousValue;
        files.push(compiled);
        return files;
    }

    // If the directory does not exist, make it
    try {
        readdirSync(module.outputDir)
    } catch (e) {
        mkdirSync(module.outputDir)
        console.log(chalk.yellow(`Created ${module.outputDir}`))
    }

    try {
        let final = (await paths.reduce<Promise<string[]>>(reducer, Promise.resolve([] as string[]))).join("")
        writeFileSync(`${module.outputDir}/${module.outputName}.ts`, final)
        console.log(chalk.green(`Created ${module.outputName}.ts`))
    } catch (e: any) {
        console.log(e.message)
        process.exit()
    }
}