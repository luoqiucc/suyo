/**
 * 这里的方法用于判断用户是否具有某个操作的权限，权限校验失败
 * 会直接抛出相关异常，阻止后续步骤的进行。
 * 
 * 如果一切正常会返回一些必要的信息，例如当前登录用户的id
 */
import query from './index'
import userService from './user-service'
import settingService from './setting-service'
import { auth } from '@/auth'

const ROLE_NAME_ROOT = 'ROOT'
const ROLE_NAME_ADMIN = 'ADMIN'
const ROLE_NAME_USER = 'USER'

const PERMISSION_NAME_UPDATE_SETTINGS = 'UPDATE_SETTINGS'
const PERMISSION_NAME_CREATE_USER = 'CREATE_USER'
const PERMISSION_NAME_UPLOAD = 'UPLOAD'
const PERMISSION_NAME_AUTH = 'AUTH'

const SETTINGS_NAME_FREE_REGISTER = 'FREE_REGISTER'

async function getLoginUser() {
    const session = await auth()
    let user = {
        name: null,
        email: null
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

        if (!email) {
            throw new Error('未登录')
        }

        const user = await userService.getUserByEmail(email)

        if (!user.length) {
            throw new Error('用户已不存在')
        }

        const statements = `
            SELECT 
                permissions.name
            FROM 
                users 
                LEFT JOIN 
                    user_role ON users.id = user_role.user_id
                LEFT JOIN 
                    role_permission ON user_role.role_id=role_permission.role_id
                LEFT JOIN 
                    permissions ON role_permission.permission_id = permissions.id
            WHERE
                users.id = ? and permissions.name = '${PERMISSION_NAME_UPDATE_SETTINGS}';`

        const [result] = await query(statements, [user[0].id])

        if (!result.length) {
            throw new Error('权限不足')
        }

        return true
    }

    // uid 被修改用户的uid
    async updateUserInfoAuth(uid) {
        const { email } = await getLoginUser()

        if (!email) {
            throw new Error('未登录')
        }

        const user = await userService.getUserByEmail(email)

        if (!user.length) {
            throw new Error('用户已不存在')
        }

        if (user[0].uid !== uid) {
            throw new Error('权限不足')
        }

        return true
    }

    async createUserAuth() {
        const { email } = await getLoginUser()

        /**
         * 先从设置表中读一下注册相关的设置，若已经设置了允许注册就直接返回 true ；若不
         * 允许自由注册就继续下面的判断。
         * 
         * 先判断是否登录，若没有登录就继续判断是否开放注册，若发现已经允许注册则直接返
         * 回 true，否则继续判断是否为首个用户，若为首个用户就直接返回 true；如果有登录，
         * 就先直接判断登录用户是否具有创建用户的权限
         */
        const settings = await settingService.getAll()

        settings.filter((item) => {
            return item.name === SETTINGS_NAME_FREE_REGISTER
        })

        if (settings[0].value === '1') {
            return true
        }

        if (!email) {
            const user = await userService.getAll()
            if (!user.length) {
                return true
            }
            throw new Error('未登录')
        } else {
            const user = await userService.getUserByEmail(email)

            if (!user.length) {
                throw new Error('用户已不存在')
            }

            const permissionsStatements = `
                SELECT 
                    permissions.name
                FROM 
                    users 
                    LEFT JOIN 
                        user_role ON users.id = user_role.user_id
                    LEFT JOIN 
                        role_permission ON user_role.role_id=role_permission.role_id
                    LEFT JOIN 
                        permissions ON role_permission.permission_id = permissions.id
                WHERE
                    users.id = ? AND permissions.name='${PERMISSION_NAME_CREATE_USER}';`

            const [result] = await query(permissionsStatements, [user[0].id])

            if (!result.length) {
                throw new Error('权限不足')
            }

            return true
        }
    }

    // 校验用户是否有上传文档的权限
    async createDocAuth() {
        const { email } = await getLoginUser()

        if (!email) {
            throw new Error('未登录')
        }

        const user = await userService.getUserByEmail(email)

        if (!user.length) {
            throw new Error('用户已不存在')
        }

        const userId = user[0].id

        const permissionsStatements = `
            SELECT 
                permissions.name
            FROM 
                users 
                LEFT JOIN 
                    user_role ON users.id = user_role.user_id
                LEFT JOIN 
                    role_permission ON user_role.role_id=role_permission.role_id
                LEFT JOIN 
                    permissions ON role_permission.permission_id = permissions.id
            WHERE
                users.id = ? AND permissions.name='${PERMISSION_NAME_UPLOAD}';`

        const [result] = await query(permissionsStatements, [userId])

        if (!result.length) {
            throw new Error('权限不足')
        }

        return userId
    }
}

export default new AuthorizedService()