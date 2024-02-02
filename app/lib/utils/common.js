import { pinyin } from 'pinyin-pro'

export function toPinyin(text) {
    return pinyin(
        String(text),
        { toneType: 'none' }
    ).replace(/\s*/g, '')
}