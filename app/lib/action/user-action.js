'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { stateInfo } from '@/app/lib/error'
import authorizedService from '@/app/lib/db/authorized-service'
import userService from '@/app/lib/db/user-service'
import { getUid } from '@/app/lib/utils/uid'
import { passwordEncoding } from '@/app/lib/utils/auth'

export async function editUsername(prevState, formData) {
    const uid = formData.get('userUid')
    const username = formData.get('username')

    try {
        await authorizedService.updateUserInfoAuth(uid)
        await userService.editUsername(uid, username)
    } catch (error) {
        return stateInfo(error.message)
    }

    revalidatePath('/suyo/setting/user')
    redirect('/suyo/setting/user')
}

export async function createUser(prevState, formData) {
    const username = formData.get('username')
    const email = formData.get('email')
    const password = formData.get('password')

    try {
        await authorizedService.createUserAuth()
        await userService.create(
            getUid(),
            username,
            email,
            passwordEncoding(password)
        )
    } catch (error) {
        return stateInfo(error.message)
    }

    revalidatePath('/suyo/setting/user')
    redirect('/suyo/setting/user')
}