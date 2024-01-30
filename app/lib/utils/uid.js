import { uid } from 'uid'

const UID_LENGTH = 16
export function getUid() {
    return uid(UID_LENGTH)
}