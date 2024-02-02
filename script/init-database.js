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
            role_name VARCHAR(255) NOT NULL UNIQUE,
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
            permission_name VARCHAR(255) NOT NULL UNIQUE,
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
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            user_id INT NOT NULL,
            role_id INT NOT NULL,
            create_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_timestamp TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`

    await query(statements)
}

// 角色权限表
async function seedRolePermission() {
    const statements = `
        CREATE TABLE IF NOT EXISTS role_permission (
            uid VARCHAR(255) NOT NULL,
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            role_id INT NOT NULL,
            permission_id INT NOT NULL,
            create_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_timestamp TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`

    await query(statements)
}

// 设置表
async function seedSettings() {
    const statements = `
        CREATE TABLE IF NOT EXISTS settings (
            uid VARCHAR(255) NOT NULL,
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            setting_name VARCHAR(255) UNIQUE,
            setting_value BIGINT,
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
            doc_name VARCHAR(255) NOT NULL,
            author VARCHAR(255) DEFAULT '未知作者',
            description TEXT,
            uploader INT NOT NULL,
            categorization_id INT DEFAULT 0,
            create_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_timestamp TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`

    await query(statements)
}

// 分类表
async function seedcategorizations() {
    const statements = `
        CREATE TABLE IF NOT EXISTS categorizations (
            uid VARCHAR(255) NOT NULL,
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            categorization_name VARCHAR(255) NOT NULL,
            categorization_url VARCHAR(255) NOT NULL,
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
            chapters_id INT NOT NULL,
            body TEXT,
            create_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_timestamp TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`

    await query(statements)
}

async function initalizeData() {
    // 初始化设置表中的数据
    const insertRegisterSettingsStatements = `
        INSERT INTO settings (uid, setting_name, setting_value, description) VALUES (?, '开放注册', '0', '是否允许自由注册')`

    await query(insertRegisterSettingsStatements, [getUid()])

    // 初始化权限表中的数据
    const insertSettingPermissionsStatements = `
        INSERT INTO permissions (uid, permission_name, description) VALUES (?, '调整设置', '调整SUYO的设置，例如分类，注册行为');`

    const insertAddUserPermissionsStatements = `
        INSERT INTO permissions (uid, permission_name, description) VALUES (?, '添加用户', '创建新用户的权限');`

    const insertUploadPermissionsStatements = `
        INSERT INTO permissions (uid, permission_name, description) VALUES (?, '上传文件', '上传文件的权限，例如上传新文档');`

    const insertAuthorizationPermissionsStatements = `
        INSERT INTO permissions (uid, permission_name, description) VALUES (?, '授权', '为其他用户授权');`

    const [setting] = await query(insertSettingPermissionsStatements, [getUid()])
    const [addUser] = await query(insertAddUserPermissionsStatements, [getUid()])
    const [upload] = await query(insertUploadPermissionsStatements, [getUid()])
    const [authorization] = await query(insertAuthorizationPermissionsStatements, [getUid()])

    const settingPermissionId = setting.insertId
    const addUserPermissionId = addUser.insertId
    const uploadPermissionId = upload.insertId
    const authorizationPermissionId = authorization.insertId

    // 初始化角色表中的数据
    const insertRootStatements = `
        INSERT INTO roles (uid, role_name, description) VALUES (?, 'ROOT', '超级管理员，仅能设置一位，可以进行全部操作');`

    const insertAdminStatements = `
        INSERT INTO roles (uid, role_name, description) VALUES (?, 'ADMIN', '普通管理员，可以进行大部分操作');`

    const insertUserStatements = `
        INSERT INTO roles (uid, role_name, description) VALUES (?, 'USER', '普通用户，具体权限由管理员赋予');`

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
    await query(authorizationStatements, [getUid(), rootId, addUserPermissionId])
    await query(authorizationStatements, [getUid(), rootId, uploadPermissionId])
    await query(authorizationStatements, [getUid(), rootId, authorizationPermissionId])

    await query(authorizationStatements, [getUid(), adminId, settingPermissionId])
    await query(authorizationStatements, [getUid(), adminId, uploadPermissionId])
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
    await seedcategorizations()
    await seedContent()

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