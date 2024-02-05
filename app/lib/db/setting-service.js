import query from './index'

class SettingService {
    async getAll() {
        const statements = `SELECT * FROM settings`

        const [result] = await query(statements)

        return result
    }
}

export default new SettingService()