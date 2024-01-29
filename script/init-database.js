/*
 * 应用在这里初始化所有的数据库表
 *
 */
import sql from '@/app/lib/db'
import { errorLog, successLog } from '@/app/lib/utils/log'

// 用户表
async function seedUesrs() {
    const statements = `
        CREATE TABLE IF NOT EXISTS users (
            uid VARCHAR(255) NOT NULL,
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(255),
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            create_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_timestamp TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`

    await sql.execute(statements)
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
            categorization_id INT DEFAULT 0,
            create_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_timestamp TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`

    await sql.execute(statements)
}

// 分类表
async function seedcategorizations() {
    const statements = `
        CREATE TABLE IF NOT EXISTS categorizations (
            uid VARCHAR(255) NOT NULL,
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            categorization_name VARCHAR(255) NOT NULL,
            categorization_url VARCHAR(255) NOT NULL,
            description TEXT,
            create_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_timestamp TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`

    await sql.execute(statements)
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

    await sql.execute(statements)
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

    await sql.execute(statements)
}

async function main() {
    await seedUesrs()
    await seedDocs()
    await seedChapters()
    await seedcategorizations()
    await seedContent()

    successLog('数据库配置完成')
}

main().catch((error) => {
    errorLog('数据库初始化失败\n' + error)
})