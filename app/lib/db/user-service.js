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
}

export default new UserService()