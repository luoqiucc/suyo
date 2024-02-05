import query from './index'

class DocService {
    async getAll() {
        const statements = `SELECT * FROM docs`

        const [result] = await query(statements)

        return result
    }

    async getDocsByConstraints(constraints) {
        let statements = `
            SELECT
                docs.*,
                categorizations.uid AS categorizations_uid,
                categorizations.id AS categorizations_id,
                categorizations.title AS categorizations_title,
                categorizations.url AS categorizations_url,
                categorizations.description AS categorizations_description,
                categorizations.create_timestamp AS categorizations_create_timestamp,
                categorizations.update_timestamp AS categorizations_update_timestamp
            FROM
                docs
                LEFT JOIN
                    categorizations ON docs.categorization_id = categorizations.id `

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
            statements += ` WHERE categorizations.url=? `
            params = [
                categorization,
                ...params
            ]
        }

        statements += ` LIMIT  ?, ? `

        const [result] = await query(statements, params)

        console.log(result);

        return result
    }

    async create(
        uid,
        title,
        author,
        description,
        uploader
    ) {
        const statements = `
            INSERT INTO docs (uid, title, author, description, uploader) VALUES (?, ?, ?, ?, ?);`

        const [result] = await query(statements, [
            uid,
            title,
            author,
            description,
            uploader
        ])

        return result
    }
}

export default new DocService()