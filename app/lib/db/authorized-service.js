/**
 * 这里的方法用于判断用户是否具有某个操作的权限，权限校验失败
 * 会直接抛出相关异常，阻止后续步骤的进行。
 * 
 * 如果一切正常会返回 true (这个返回值接不接收无所谓了，根据
 * 这个方法的逻辑，要么抛出异常后续步骤直接寄，要么就是一切正常
 * 返回 true，所以说他只有返回 true 这一个情况)
 */

import { auth } from '@/auth'

import query from './index'
import userService from './user-service'

const ROLES = {
    root: 'ROOT',
    admin: 'ADMIN',
    user: 'USER'
}

async function getLoginUser() {
    const session = await auth()
    let user = {
        name: 'null',
        email: 'null'
    }

    if (session) {
        user.name = session.user.name
        user.email = session.user.email
    }

    return user
}

class AuthorizedService {
    async updateCategorizationAuth() {
        const { email } = await getLoginUser()

        if (email === 'null') {
            throw new Error('未登录')
        }

        const user = await userService.getUserByEmail(email)

        if (!user.length) {
            throw new Error('用户已不存在')
        }

        const statements = `
            SELECT * 
            FROM user_role u LEFT JOIN roles r ON u.role_id = r.id  
            WHERE u.user_id = ? AND ( r.role_name = '${ROLES.root}' OR r.role_name = '${ROLES.admin}' )`

        const [result] = await query(statements, [user[0].id])

        if (!result.length) {
            throw new Error('权限不足')
        }

        return true
    }
}

export default new AuthorizedService()