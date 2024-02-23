/*
 * 应用在这里初始化所有的数据库表
 *
 */
import query from '@/app/lib/db'
import { getUid } from '@/app/lib/utils/uid'
import { errorLog, successLog } from '@/app/lib/utils/log'

// 用户表
async function seedUesrs() {
    const statements = `
        CREATE TABLE IF NOT EXISTS users (
            uid VARCHAR(255) NOT NULL,
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(255),
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            create_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_timestamp TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`

    await query(statements)
}

// 角色表
async function seedRoles() {
    const statements = `
        CREATE TABLE IF NOT EXISTS roles (
            uid VARCHAR(255) NOT NULL,
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL UNIQUE,
            title VARCHAR(255) NOT NULL UNIQUE,
            description VARCHAR(255),
            create_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_timestamp TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`

    await query(statements)
}

// 权限表
async function seedPermissions() {
    const statements = `
        CREATE TABLE IF NOT EXISTS permissions (
            uid VARCHAR(255) NOT NULL,
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL UNIQUE,
            title VARCHAR(255) NOT NULL UNIQUE,
            description VARCHAR(255),
            create_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_timestamp TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`

    await query(statements)
}

// 用户角色表
async function seedUserRole() {
    const statements = `
        CREATE TABLE IF NOT EXISTS user_role (
            uid VARCHAR(255) NOT NULL,
            id INT NOT NULL AUTO_INCREMENT,
            user_id INT NOT NULL,
            role_id INT NOT NULL,
            create_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_timestamp TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY(id, user_id, role_id)
        );`

    await query(statements)
}

// 角色权限表
async function seedRolePermission() {
    const statements = `
        CREATE TABLE IF NOT EXISTS role_permission (
            uid VARCHAR(255) NOT NULL,
            id INT NOT NULL AUTO_INCREMENT,
            role_id INT NOT NULL,
            permission_id INT NOT NULL,
            create_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_timestamp TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY(id, role_id, permission_id)
        );`

    await query(statements)
}

// 设置表
async function seedSettings() {
    const statements = `
        CREATE TABLE IF NOT EXISTS settings (
            uid VARCHAR(255) NOT NULL,
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) UNIQUE,
            value TINYINT,
            title VARCHAR(255) UNIQUE,
            description VARCHAR(255),
            create_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_timestamp TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`

    await query(statements)
}

// 文档表
async function seedDocs() {
    const statements = `
        CREATE TABLE IF NOT EXISTS docs (
            uid VARCHAR(255) NOT NULL,
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            title VARCHAR(255) NOT NULL,
            language VARCHAR(255),
            identifier VARCHAR(255),
            creator VARCHAR(255),
            contributor VARCHAR(255),
            publisher VARCHAR(255),
            type VARCHAR(255),
            date VARCHAR(255),
            description TEXT,
            uploader INT,
            categorization_id INT DEFAULT 0,
            create_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_timestamp TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`

    await query(statements)
}

// 分类表
async function seedCategorizations() {
    const statements = `
        CREATE TABLE IF NOT EXISTS categorizations (
            uid VARCHAR(255) NOT NULL,
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            title VARCHAR(255) NOT NULL,
            url VARCHAR(255) NOT NULL,
            description VARCHAR(255),
            create_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_timestamp TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`

    await query(statements)
}

// 章节表
async function seedChapters() {
    const statements = `
        CREATE TABLE IF NOT EXISTS chapters (
            uid VARCHAR(255) NOT NULL,
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            doc_id INT NOT NULL,
            title VARCHAR(255) DEFAULT '无标题',
            play_order int,
            anchor VARCHAR(255),
            create_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_timestamp TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`

    await query(statements)
}

// 内容表
async function seedContent() {
    const statements = `
        CREATE TABLE IF NOT EXISTS content (
            uid VARCHAR(255) NOT NULL,
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            doc_id INT NOT NULL,
            play_order int,
            style LONGTEXT,
            body LONGTEXT,
            create_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_timestamp TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`

    await query(statements)
}

// 样式表
async function seedStyles() {
    const statements = `
        CREATE TABLE IF NOT EXISTS styles (
            uid VARCHAR(255) NOT NULL,
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            filename VARCHAR(255) NOT NULL,
            doc_id INT NOT NULL,
            content_id INT NOT NULL,
            style LONGTEXT,
            create_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_timestamp TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`

    await query(statements)
}

// 封面表
async function seedCover() {
    const statements = `
        CREATE TABLE IF NOT EXISTS cover (
            uid VARCHAR(255) NOT NULL,
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            doc_id INT NOT NULL,
            image_base64 LONGTEXT,
            create_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_timestamp TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`

    await query(statements)
}

async function initalizeData() {
    // 初始化设置表中的数据
    const insertRegisterSettingsStatements = `
        INSERT INTO settings (uid, name, value, title, description) VALUES (?, 'FREE_REGISTER', '0', '允许注册', '是否允许自由注册');`

    await query(insertRegisterSettingsStatements, [getUid()])

    // 初始化权限表中的数据
    const insertSettingPermissionsStatements = `
        INSERT INTO permissions (uid, name, title, description) VALUES (?, 'UPDATE_SETTINGS', '调整设置', '调整SUYO的设置，例如分类，注册行为');`

    const insertCreateUserPermissionsStatements = `
        INSERT INTO permissions (uid, name, title, description) VALUES (?, 'CREATE_USER', '添加用户', '创建新用户的权限');`

    const insertUploadPermissionsStatements = `
        INSERT INTO permissions (uid, name, title, description) VALUES (?, 'UPLOAD', '上传文件', '上传文件的权限，例如上传新文档');`

    const insertAuthPermissionsStatements = `
        INSERT INTO permissions (uid, name, title, description) VALUES (?, 'AUTH', '授权', '为其他用户授权');`

    const [setting] = await query(insertSettingPermissionsStatements, [getUid()])
    const [createUser] = await query(insertCreateUserPermissionsStatements, [getUid()])
    const [upload] = await query(insertUploadPermissionsStatements, [getUid()])
    const [auth] = await query(insertAuthPermissionsStatements, [getUid()])

    const settingPermissionId = setting.insertId
    const createUserPermissionId = createUser.insertId
    const uploadPermissionId = upload.insertId
    const authPermissionId = auth.insertId

    // 初始化角色表中的数据
    const insertRootStatements = `
        INSERT INTO roles (uid, name, title, description) VALUES (?, 'ROOT', '超级管理员', '超级管理员，仅能设置一位，可以进行全部操作');`

    const insertAdminStatements = `
        INSERT INTO roles (uid, name, title, description) VALUES (?, 'ADMIN', '管理员', '管理员，可以进行大部分操作');`

    const insertUserStatements = `
        INSERT INTO roles (uid, name, title, description) VALUES (?, 'USER', '用户', '普通用户，具体权限由管理员赋予');`

    const [root] = await query(insertRootStatements, [getUid()])
    const [admin] = await query(insertAdminStatements, [getUid()])
    const [user] = await query(insertUserStatements, [getUid()])

    const rootId = root.insertId
    const adminId = admin.insertId
    const userId = user.insertId

    // 为角色初始化权限
    const authorizationStatements = `
        INSERT INTO role_permission (uid, role_id, permission_id) VALUES (?, ?, ?);`

    await query(authorizationStatements, [getUid(), rootId, settingPermissionId])
    await query(authorizationStatements, [getUid(), rootId, createUserPermissionId])
    await query(authorizationStatements, [getUid(), rootId, uploadPermissionId])
    await query(authorizationStatements, [getUid(), rootId, authPermissionId])

    await query(authorizationStatements, [getUid(), adminId, settingPermissionId])
    await query(authorizationStatements, [getUid(), adminId, createUserPermissionId])
    await query(authorizationStatements, [getUid(), adminId, uploadPermissionId])

    await query(authorizationStatements, [getUid(), userId, uploadPermissionId])
}

async function main() {
    await seedUesrs()
    await seedRoles()
    await seedPermissions()
    await seedUserRole()
    await seedRolePermission()
    await seedSettings()
    await seedDocs()
    await seedChapters()
    await seedCategorizations()
    await seedContent()
    await seedStyles()
    await seedCover()

    try {
        await initalizeData()
    } catch (e) {
        if (!String(e).includes('Duplicate entry')) {
            throw new Error(e)
        }
    }

    successLog('数据库配置完成')
}

main().catch((error) => {
    errorLog('数据库初始化失败\n' + error)
})