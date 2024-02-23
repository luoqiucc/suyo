import query from './index'

class ChapterService {
    /**
     * 这个方法会对sql进行一定的优化以提高性能，主要就是合并多个插入语句
     * @param {Array} catalogues
     * @returns 插入结果
     */
    async create(catalogueArray) {
        if (!catalogueArray instanceof Array) {
            throw new Error('参数类型错误')
        }

        const head = `INSERT INTO chapters (uid, doc_id, title, play_order, anchor) VALUES `

        let sqlValue = ``
        let params = []
        for (let i = 0; i < catalogueArray.length; i++) {
            const catalogue = catalogueArray[i]
            sqlValue += `(?, ?, ?, ?, ?),`
            params.push(
                catalogue.uid,
                catalogue.docId,
                catalogue.title,
                catalogue.playOrder,
                catalogue.anchor,
            )
        }

        const statements = head + sqlValue.substring(0, sqlValue.length - 1)

        const [result] = await query(statements, params)

        return result
    }
}

export default new ChapterService()