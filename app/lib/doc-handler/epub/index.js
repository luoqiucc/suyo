import compressing from 'compressing'

import docService from '@/app/lib/db/doc-service'
import EpubContext from './epub-context'

export async function epub(buffer, userId, uid) {
    // 创建一个epub实例
    const epubContext = new EpubContext(uid)

    // 展开epub文件
    await compressing.zip.uncompress(buffer, epubContext.getRootPath())

    const metadata = await epubContext.getMetadata()
    const coverImageBase64 = await epubContext.getCoverImgBase64()

    await docService.create(
        uid,
        userId,
        metadata,
        coverImageBase64
    )
}