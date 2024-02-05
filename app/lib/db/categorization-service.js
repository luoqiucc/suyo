import query from './index'

class CategorizationService {
    async getAll() {
        const statements = `SELECT * FROM categorizations`

        const [result] = await query(statements)

        return result
    }

    async create(
        uid,
        title,
        url,
        description
    ) {
        const statements = `
            INSERT INTO categorizations (uid, title, url, description) VALUES (?, ?, ?, ?);`

        const [result] = await query(statements, [
            uid,
            title,
            url,
            description
        ])

        return result
    }

    async edit(
        uid,
        name,
        url,
        description
    ) {
        const statements = `
            UPDATE
                categorizations
            SET
                name = ?,
                url = ?,
                description = ?
            WHERE
                uid = ?;`

        const [result] = await query(statements, [
            name,
            url,
            description,
            uid
        ])

        return result
    }

    async remove(uid) {
        const statements = `DELETE FROM categorizations WHERE uid = ?;`

        const [result] = await query(statements, [uid])

        return result
    }
}

export default new CategorizationService()
