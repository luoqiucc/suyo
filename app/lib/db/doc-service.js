import query from './index'

class DocService {
    async getAll() {
        const statements = `SELECT * FROM docs`

        const [result] = await query(statements)

        return result
    }

    async getDocsByConstraints(constraints) {
        let statements = `
            SELECT * FROM docs d LEFT JOIN categorizations c ON d.categorization_id = c.id `

        const {
            currentPage,
            categorization
        } = constraints

        const pageSize = 40
        let params = [
            String((currentPage - 1) * pageSize),
            String(pageSize),
        ]

        if (categorization) {
            statements += ` WHERE categorization_url=? `
            params = [
                categorization,
                ...params
            ]
        }

        statements += ` LIMIT  ?, ? `

        const [result] = await query(statements, params)

        return result
    }
}

export default new DocService()