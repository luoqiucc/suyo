import { epub } from './epub'

const FILE_TYPE_EPUB = 'application/epub+zip'

export default async function docHandler(file, buffer, userId, uid) {
    switch (file.type) {
        case FILE_TYPE_EPUB:
            await epub(buffer, userId, uid)
            break
        default:
            throw new Error('不支持的文件格式')
    }
}
