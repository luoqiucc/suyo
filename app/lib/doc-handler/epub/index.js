import { join } from 'path'
import compressing from 'compressing'

import docService from '@/app/lib/db/doc-service'
import chapterService from '@/app/lib/db/chapter-service'
import contentService from '@/app/lib/db/content-service'
import { getUid } from '@/app/lib/utils/uid'
import EpubContext from './epub-context'
import { xmlParser, xmlBuilder } from '@/app/lib/utils/common'
import { readFileByPath } from '@/app/lib/utils/file-io'

const IMG_BASE64_PREFIX = 'data:image/png;base64,'

export async function epub(buffer, userId, uid) {
    // 创建一个epub实例
    const epubContext = new EpubContext(uid)

    // 展开epub文件
    await compressing.zip.uncompress(buffer, epubContext.getRootPath())

    const metadata = await epubContext.getMetadata()
    const coverImageBase64 = await epubContext.getCoverImgBase64()
    const catalogue = await epubContext.getCatalogue()

    const { docResult } = await docService.create(
        uid,
        userId,
        metadata,
        IMG_BASE64_PREFIX + coverImageBase64
    )

    const docId = docResult.insertId

    const catalogueArray = catalogue.map((item) => {
        return {
            ...item,
            uid: getUid(),
            docId,
            anchor: splitTextSrc(item.src).anchor
        }
    })

    await chapterService.create(catalogueArray)

    let contentArray = []
    for (let i = 0; i < catalogue.length; i++) {
        const textPath = splitTextSrc(catalogue[i].src)
        const htmlPath = join(await epubContext.getTocNcxPath(), textPath.src)

        const html = await readFileByPath(htmlPath)
        const content = xmlParser(html)['html']

        const body = content.body
        const styleString = await mergeStyle(
            join(htmlPath, '../'),
            content.head.link,
            content.head.style
        )

        const obj = await scanImgTabToBase64(join(htmlPath, '../'), body)

        contentArray.push({
            uid: getUid(),
            docId,
            playOrder: catalogue[i].playOrder,
            style: styleString,
            body: xmlBuilder(obj)
        })
    }

    await contentService.create(contentArray)
}

/**
 * 合并该文档的所有css
 * @param {Object} epubContext 
 * @param {*} styles 
 * @param {*} styleTab 
 * @returns 
 */
async function mergeStyle(htmlPath, styles, styleTab) {
    let styleString = ''

    if (styles) {
        if (styles instanceof Array) {
            styles.forEach(async (item) => {
                styleString += await readFileByPath(
                    join(htmlPath, item['@_href'])
                )
            })
        } else if (styles instanceof Object) {
            styleString += await readFileByPath(
                join(htmlPath, styles['@_href'])
            )
        }
    }
    if (styleTab) {
        if (styleTab instanceof Object) {
            styleString += styleTab['#text']
        } else {
            styleString += styleTab
        }
    }

    return styleString
}

/**
 * 
 * @param {String} src 
 * @returns 
 */
function splitTextSrc(src) {
    const index = src.lastIndexOf('#')
    if (index === -1) {
        return {
            src,
            anchor: '#'
        }
    }

    return {
        src: src.substring(0, index),
        anchor: src.substring(index)
    }
}

/**
 * 该方法用于将html文档中img标签的src属性替换为所指向资源的base64编码
 * @param {Object} obj 
 * @returns 修改后的对象
 */
async function scanImgTabToBase64(htmlPath, obj) {
    if (obj instanceof Object) {
        for (let key in obj) {
            if (obj[key] instanceof Object) {
                await scanImgTabToBase64(htmlPath, obj[key])
            }

            if (key === 'img') {
                if (!obj[key]['@_src'].startsWith(IMG_BASE64_PREFIX)) {
                    const imgBase64 = await toBase64(join(htmlPath, obj[key]['@_src']))
                    obj[key]['@_src'] = IMG_BASE64_PREFIX + imgBase64
                }
            }
        }
    }

    return obj
}

async function toBase64(path) {
    return Buffer.from(
        await readFileByPath(path)
    ).toString('base64')
}

// 方法scanImgTabToBase64()的另一种实现方式，未使用for in
// async function scanImgTabToBase64(htmlPath, obj) {
//     if (obj instanceof Object) {
//         const key = Object.keys(obj)
//         for (let i = 0; i < key.length; i++) {
//             if (obj[key[i]] instanceof Object) {
//                 await scanImgTabToBase64(htmlPath, obj[key[i]])
//             }
//             if (key[i] === 'img') {
//                 if (!obj[key[i]]['@_src'].startsWith(IMG_BASE64_PREFIX)) {
//                     const imgBase64 = await toBase64(join(htmlPath, obj[key[i]]['@_src']))
//                     obj[key[i]]['@_src'] = IMG_BASE64_PREFIX + imgBase64
//                 }
//             }
//         }
//     }
//     return obj
// }