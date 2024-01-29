import query from './index'

class CategorizationService {
    async getAll() {
        const statements = `SELECT * FROM categorizations`

        const [result] = await query(statements)

        return result
    }

    async add(
        uid,
        categorization_name,
        categorization_url,
        description
    ) {
        const statements = `
            INSERT INTO categorizations
            (uid, categorization_name, categorization_url, description) VALUES
            (?, ?, ?, ?)`

        const [result] = await query(statements, [
            uid,
            categorization_name,
            categorization_url,
            description
        ])

        return result
    }

    async remove(categorization_uid) {
        const statements = `DELETE FROM categorizations WHERE uid = ?`

        const [result] = await query(statements, [categorization_uid])
    }
}

export default new CategorizationService()
