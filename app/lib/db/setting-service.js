import query from './index'

class SettingService {
    async getAll() {
        const statements = `SELECT * FROM settings`

        const [result] = await query(statements)

        return result
    }

    async updateValueByUid(uid, value) {
        const statements = `UPDATE settings SET value = ? WHERE uid = ?;`

        const [result] = await query(statements, [value, uid])

        return result
    }
}

export default new SettingService()