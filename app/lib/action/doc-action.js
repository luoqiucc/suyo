'use server'

import { existsSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { join } from 'path'
import { getUid } from '@/app/lib/utils/uid'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { stateInfo } from '@/app/lib/action/state.js'
import userService from '@/app/lib/db/user-service'
import docHandler from '../doc-handler'
import { auth } from '@/auth'

const SOURCE_PATH = join(__dirname, '../../../', 'store')

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

export async function addDoc(prevState, formData) {
    const { email } = await getLoginUser()
    if (!email) {
        throw new Error('未登录')
    }

    const user = await userService.getUserByEmail(email)
    if (!user.length) {
        throw new Error('用户已不存在')
    }

    const userId = user[0].id

    const files = formData.getAll('files')
    try {
        files.forEach(async (item) => {
            const bytes = await item.arrayBuffer()
            let buffer = Buffer.from(bytes)
            const uid = getUid()

            await docHandler(item, buffer, userId, uid)
        })
    } catch (error) {
        return stateInfo(error.message)
    }

    revalidatePath('/suyo/manager')
    redirect('/suyo/manager')
}