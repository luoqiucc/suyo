import query from './index'

class ContentService {
    async create(contentArray) {
        if (!contentArray instanceof Array) {
            throw new Error('参数类型错误')
        }

        const head = `INSERT INTO content (uid, doc_id, play_order, style, body) VALUES `

        let sqlValue = ``
        let params = []
        for (let i = 0; i < contentArray.length; i++) {
            const content = contentArray[i]
            sqlValue += `(?, ?, ?, ?, ?),`
            params.push(
                content.uid,
                content.docId,
                content.playOrder,
                content.style,
                content.body,
            )
        }

        const statements = head + sqlValue.substring(0, sqlValue.length - 1)

        const [result] = await query(statements, params)

        return result

    }

    async getContentByChapterUid(chapterUid) {
        const statements = `
            SELECT 
                content.*
            FROM 
                content
                    LEFT JOIN chapters ON chapters.play_order = content.play_order AND chapters.doc_id = content.doc_id
            WHERE
                chapters.uid = ?;`

        const [result] = await query(statements, [chapterUid])

        return result
    }
}

export default new ContentService()