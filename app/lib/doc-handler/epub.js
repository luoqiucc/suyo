import { join } from 'path'
import compressing from 'compressing'

import docService from '@/app/lib/db/doc-service'
import { xmlParser } from '@/app/lib/utils/common'
import { readFileByPath } from '@/app/lib/utils/file-io'

const SOURCE_PATH = join(__dirname, '../../../', 'store')
const DC_TITLE = 'dc:title'
const DC_LANGUAGE = 'dc:language'
const DC_IDENTIFIER = 'dc:identifier'
const DC_CREATOR = 'dc:creator'
const DC_CONTRIBUTOR = 'dc:contributor'
const DC_PUBLISHER = 'dc:publisher'
const DC_TYPE = 'dc:type'
const DC_DESCRIPTION = 'dc:description'
const DC_DATE = 'dc:date'

function getEpubRootPath(uid) {
    return join(SOURCE_PATH, uid)
}

function getContainerXMLPath(uid) {
    return join(getEpubRootPath(uid), 'META-INF', 'container.xml')
}

// 获得epub中content文件的路径
function getRelPath(path) {
    if (!path) {
        return join('')
    }

    const index = path.lastIndexOf('/')

    if (index === -1) {
        return join('')
    }

    return path.substring(0, index)
}

function findCover(manifest) {
    if (!manifest) {
        return null
    }

    for (let i = 0; i < manifest.length; i++) {
        const item = manifest[i]

        if (
            String(item['@_id']).includes('cover') &&
            String(item['@_media-type']).includes('image')
        ) return item
    }
}

function epubMetadataFilter(value) {
    if (!value) {
        return null
    }

    if (value instanceof Array) {
        return value[0]
    }

    return value
}

async function readImageToBase64(path) {
    const data = await readFileByPath(path)
    return Buffer.from(data).toString('base64')
}

export async function epub(buffer, userId, uid) {
    // 展开epub文件
    await compressing.zip.uncompress(buffer, join(SOURCE_PATH, uid))

    // 查找content.xml
    const containerXMLData = await readFileByPath(getContainerXMLPath(uid))
    const docContentXMLPath = xmlParser(containerXMLData).container.rootfiles.rootfile['@_full-path']
    const docContentXMLData = await readFileByPath(join(SOURCE_PATH, uid, docContentXMLPath))

    // 解析content.xml
    const epubContent = xmlParser(docContentXMLData)
    const epubMetadata = xmlParser(docContentXMLData, true).package.metadata

    const manifest = epubContent.package.manifest
    const cover = findCover(manifest.item)

    // 读取封面图片并转为base64
    const coverImgPath = join(getRelPath(docContentXMLPath), cover['@_href'])
    const coverImgAbsPath = join(getEpubRootPath(uid), coverImgPath)
    const imageBase64 = await readImageToBase64(coverImgAbsPath)

    await docService.create(
        uid,
        userId,
        {
            title: epubMetadataFilter(epubMetadata[DC_TITLE]),
            language: epubMetadataFilter(epubMetadata[DC_LANGUAGE]),
            identifier: epubMetadataFilter(epubMetadata[DC_IDENTIFIER]),
            creator: epubMetadataFilter(epubMetadata[DC_CREATOR]),
            contributor: epubMetadataFilter(epubMetadata[DC_CONTRIBUTOR]),
            publisher: epubMetadataFilter(epubMetadata[DC_PUBLISHER]),
            type: epubMetadataFilter(epubMetadata[DC_TYPE]),
            description: epubMetadataFilter(epubMetadata[DC_DESCRIPTION]),
            date: epubMetadataFilter(epubMetadata[DC_DATE])
        },
        imageBase64
    )
}