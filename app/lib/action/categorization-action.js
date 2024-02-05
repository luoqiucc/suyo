'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { getUid } from '@/app/lib/utils/uid'
import { toPinyin } from '@/app/lib/utils/common'
import categorizationService from '@/app/lib/db/categorization-service'
import authorizedService from '@/app/lib/db/authorized-service'
import { stateInfo } from '@/app/lib/error'

export async function createCategorization(prevState, formData) {
    const title = formData.get('title')
    const description = formData.get('description')
    let url = formData.get('url')

    if (!url || url === '') {
        url = toPinyin(title)
    }

    try {
        await authorizedService.updateCategorizationAuth()
        await categorizationService.create(getUid(), title, url, description)
    } catch (error) {
        return stateInfo(error.message)
    }

    revalidatePath('/suyo/setting/categorization')
    redirect('/suyo/setting/categorization')
}

export async function removeCategorization(prevState, formData) {
    const uid = formData.get('uid')

    try {
        await authorizedService.updateCategorizationAuth()
        await categorizationService.remove(uid)
    } catch (error) {
        return stateInfo(error.message)
    }

    revalidatePath('/suyo/setting/categorization')
    redirect('/suyo/setting/categorization')
}

export async function editCategorization(prevState, formData) {
    const uid = formData.get('uid')
    const name = formData.get('name')
    const url = formData.get('url')
    const description = formData.get('description')

    try {
        await authorizedService.updateCategorizationAuth()
        await categorizationService.edit(uid, name, url, description)
    } catch (error) {
        return stateInfo(error.message)
    }

    revalidatePath('/suyo/setting/categorization')
    redirect('/suyo/setting/categorization')
}