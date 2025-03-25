import { compile, compileFromFile } from 'json-schema-to-typescript'
import { readdir, readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const controllers = [
    {
        inputDir: "src/controllers/creatures",
        outputDir: "src/controllers/creatures/_types"
    }
]

readdir(`${controllers[0]?.inputDir}/schema`, (e, f) => {
    const _paths: string[] = []
    f.map((name: string) => {
        const pattern = /.*\.schema\.json$/
        if (!pattern.test(name)) {
            return
        }
        _paths.push(`${controllers[0]?.inputDir}/schema/${name}`)
    })
    readFiles(_paths)
})

async function readFiles(paths: string[]) {
    const reducer = async (previousValue: Promise<string[]>, currentValue: string, _index: number) => {
        const compiled = await compileFromFile(
            currentValue,
            {
                bannerComment: ""
            }
        )
        const files = await previousValue;
        files.push(compiled);
        return files;
    }
    try {
        let final = (await paths.reduce<Promise<string[]>>(reducer, Promise.resolve([] as string[]))).join("")
        const outputName = paths[0]?.split("/").pop()?.split(".")[0]
        writeFileSync(`${controllers[0]?.outputDir}/${outputName}.ts`, final)
    } catch (e: any) {
        console.log(e.message)
        process.exit()
    }
}