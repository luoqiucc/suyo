/**
 * epub文件解析
 */
import { join } from 'path'

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

export default class EpubContext {
    constructor(uid) {
        this.uid = uid
    }

    /**
     * 该方法用于获取epub文档根目录的路径
     */
    getRootPath() {
        return join(SOURCE_PATH, this.uid)
    }

    /**
     * 该方法用于获取container.xml文件的路径
     * @returns 文件路径的字符串
     */
    getContainerXMLPath() {
        return join(this.getRootPath(), 'META-INF', 'container.xml')
    }

    /**
     * 该方法用于获取元数据文件的路径，用于后续路径的拼接
     * @returns 文件路径的字符串
     */
    async getContentXMLPath() {
        const path = (await this.getContainer()).container.rootfiles.rootfile['@_full-path']

        if (!path) {
            return join('')
        }

        const index = path.lastIndexOf('/')
        if (index === -1) {
            return join('')
        }

        return join(this.getRootPath(), path.substring(0, index))
    }

    /**
     * 该方法用于获取container.xml文件中的所有信息
     * @returns 一个包含这些信息的对象
     */
    async getContainer() {
        return xmlParser(
            await readFileByPath(this.getContainerXMLPath())
        )
    }

    /**
     * 该方法用于获取所有元数据信息
     * @returns 一个包含这些信息的对象
     */
    async getContent() {
        return xmlParser(
            await readFileByPath(join(
                this.getRootPath(),
                (await this.getContainer()).container.rootfiles.rootfile['@_full-path']
            ))
        )
    }

    /**
     * 该方法用于从格式不统一的数据对象中获取有效值(该方法一般不被外部调用)。
     * 当值为空时会返回null; 如果值为数组则返回数组中下标为0的内容; 其他情况则不做修改
     * @param {Object} value 
     * @returns 字符串 或 null
     */
    metadataFilter(value) {
        if (!value) return null
        if (value instanceof Array) return value[0]
        if (value instanceof Object) return value['#text']

        return value
    }

    /**
     * 该方法用于提取该epub文档的一些说明信息
     * @returns 包含这些说明信息的对象
     */
    async getMetadata() {
        const metadata = (await this.getContent()).package.metadata

        return {
            title: this.metadataFilter(metadata[DC_TITLE]),
            language: this.metadataFilter(metadata[DC_LANGUAGE]),
            identifier: this.metadataFilter(metadata[DC_IDENTIFIER]),
            creator: this.metadataFilter(metadata[DC_CREATOR]),
            contributor: this.metadataFilter(metadata[DC_CONTRIBUTOR]),
            publisher: this.metadataFilter(metadata[DC_PUBLISHER]),
            type: this.metadataFilter(metadata[DC_TYPE]),
            description: this.metadataFilter(metadata[DC_DESCRIPTION]),
            date: this.metadataFilter(metadata[DC_DATE])
        }
    }

    /**
     * 该方法用于获取所有目录信息
     * @returns 包含目录信息的对象
     */
    async getCatalogue() {
        const manifest = (await this.getContent()).package.manifest.item
        if (!manifest) {
            return null
        }

        for (let i = 0; i < manifest.length; i++) {
            const item = manifest[i]
            if (
                String(item['@_id']).includes('ncx') &&
                String(item['@_media-type']).includes('application/x-dtbncx+xml')
            ) {
                return xmlParser(
                    await readFileByPath(join(
                        await this.getContentXMLPath(),
                        item['@_href']
                    ))
                ).ncx.navMap.navPoint
            }
        }

        return null
    }

    /**
     * 该方法用于获取封面图片的base64编码
     * @returns base64字符串
     */
    async getCoverImgBase64() {
        const manifest = (await this.getContent()).package.manifest.item
        if (!manifest) {
            return null
        }

        for (let i = 0; i < manifest.length; i++) {
            const item = manifest[i]
            if (
                String(item['@_id']).includes('cover') &&
                String(item['@_media-type']).includes('image')
            ) {
                const data = await readFileByPath(join(
                    await this.getContentXMLPath(),
                    item['@_href']
                ))
                return Buffer.from(data).toString('base64')
            }
        }

        return null
    }
}