import { XMLParser, XMLBuilder } from 'fast-xml-parser'
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

export function xmlParser(xml, isIgnoreAttributes = false) {
    const options = {
        ignoreAttributes: isIgnoreAttributes
    }
    const parser = new XMLParser(options)
    return parser.parse(xml)
}

export function xmlBuilder(obj, isIgnoreAttributes = false) {
    const options = {
        ignoreAttributes: isIgnoreAttributes
    }
    const builder = new XMLBuilder(options)
    return builder.build(obj)
}