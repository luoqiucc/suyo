import { pinyin } from 'pinyin-pro'

export function toPinyin(text) {
    return pinyin(
        String(text),
        { toneType: 'none' }
    ).replace(/\s*/g, '')
}

export function formatTime(timestamp) {
    const time = new Date(timestamp)
    return `${time.getFullYear()}/${time.getMonth()}/${time.getDate()} ${time.getHours()}:${time.getMinutes()}`
}