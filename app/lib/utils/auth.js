import md5 from 'md5'

export function passwordEncoding(password) {
    return md5(password)
}