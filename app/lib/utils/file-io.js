import { join } from 'path'
import { readFile, unlink } from 'node:fs/promises'

export async function readFileByPath(path) {
    return await readFile(join(path))
}

export async function removeFile(path) {
    return await unlink(join(path))
}