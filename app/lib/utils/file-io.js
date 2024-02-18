import { join } from 'path'
import { readFile, unlink } from 'node:fs/promises'

export async function readFileByPath(path) {
    return await readFile(join(path))
}

export async function removeFile(path) {
    return await unlink(join(path))
}

export async function readImageToBase64(path) {
    const data = await readFileByPath(path)
    return Buffer.from(data).toString('base64')
}