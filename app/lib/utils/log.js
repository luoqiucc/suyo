import chalk from 'chalk'

const error = chalk.bgRed.bold
const warning = chalk.bgYellow.bold
const success = chalk.bgGreen.bold
const info = chalk.bgBlue.bold

function getCurrentTime() {
    const time = new Date()
    return `[${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}]`
}

function errorLog(text) {
    console.log(`${error(`${getCurrentTime()} ERROR`)} ${text}`)
}

function warningLog(text) {
    console.log(`${warning(`${getCurrentTime()} WARNING`)} ${text}`)
}

function successLog(text) {
    console.log(`${success(`${getCurrentTime()} SUCCESS`)} ${text}`)
}

function infoLog(text) {
    console.log(`${info(`${getCurrentTime()} INFO`)} ${text}`)
}

export {
    errorLog,
    warningLog,
    successLog,
    infoLog
}