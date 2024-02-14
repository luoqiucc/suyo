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
                categorizations.update_timestamp AS categorizations_update_timestamp,
                cover.image_base64 AS cover_image_base64 
            FROM 
                docs 
                LEFT JOIN 
                    categorizations ON docs.categorization_id = categorizations.id 
                LEFT JOIN 
                    cover ON docs.id = cover.doc_id `

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

        return result
    }

    async create(
        uid,
        uploader,
        metadata,
        coverImageBase64
    ) {
        const statements = `
            INSERT INTO docs (uid, title, language, identifier, creator, contributor, publisher, type, date, description, uploader)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`

        const coverStatements = `INSERT INTO cover (uid, doc_id, image_base64) VALUES (?, ?, ?);`

        const [docResult] = await query(statements, [
            uid,
            metadata.title,
            metadata.language,
            metadata.identifier,
            metadata.creator,
            metadata.contributor,
            metadata.publisher,
            metadata.type,
            metadata.date,
            metadata.description,
            uploader
        ])

        const [coverResult] = await query(coverStatements, [
            uid,
            docResult.insertId,
            coverImageBase64
        ])

        return {
            docResult,
            coverResult
        }
    }
}

export default new DocService()