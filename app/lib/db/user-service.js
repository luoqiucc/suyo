import query from './index'

class UserService {
    async getUserByEmail(email) {
        const statements = `SELECT * FROM users WHERE email = ?`

        const [result] = await query(statements, [email])

        return result
    }

    async getAll() {
        const statements = `SELECT * FROM users`

        const [result] = await query(statements)

        return result
    }

    async editUsername(uid, username) {
        const statements = `
            UPDATE
                users
            SET
                username = ?
            WHERE
                uid = ?;`

        const [result] = await query(statements, [username, uid])

        return result
    }

    async create(uid, username, email, password) {
        const statements = `
            INSERT INTO users (uid, username, email, password) VALUES (?, ?, ?, ?);`

        const [result] = await query(statements, [uid, username, email, password])

        return result
    }
}

export default new UserService()