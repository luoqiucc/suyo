import query from './index'

class UserService {
    async getAll() {
        const statements = `SELECT * FROM users`

        const [result] = await query(statements)

        return result
    }
}

export default new UserService()