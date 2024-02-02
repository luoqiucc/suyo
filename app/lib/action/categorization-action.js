'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { getUid } from '@/app/lib/utils/uid'
import { toPinyin } from '@/app/lib/utils/common'
import categorizationService from '@/app/lib/db/categorization-service'
import authorizedService from '@/app/lib/db/authorized-service'
import { errorInfo } from '@/app/lib/error'

export async function createCategorization(prevState, formData) {
    const name = formData.get('categorizationName')
    const description = formData.get('categorizationDescription')
    let url = formData.get('categorizationUrl')

    if (url === '') {
        url = toPinyin(name)
    }

    try {
        await authorizedService.updateCategorizationAuth()
        await categorizationService.add(getUid(), name, url, description)
    } catch (error) {
        return errorInfo(error.message)
    }

    revalidatePath('/suyo/setting/categorization')
    redirect('/suyo/setting/categorization')
}

export async function removeCategorization(prevState, formData) {
    const uid = formData.get('categorizationUid')

    try {
        await authorizedService.updateCategorizationAuth()
        await categorizationService.remove(uid)
    } catch (error) {
        return errorInfo(error.message)
    }

    revalidatePath('/suyo/setting/categorization')
    redirect('/suyo/setting/categorization')
}

export async function editCategorization(prevState, formData) {
    const uid = formData.get('categorizationUid')
    const name = formData.get('categorizationName')
    const url = formData.get('categorizationUrl')
    const description = formData.get('categorizationDescription')

    try {
        await authorizedService.updateCategorizationAuth()
        await categorizationService.edit(uid, name, url, description)
    } catch (error) {
        return errorInfo(error.message)
    }

    revalidatePath('/suyo/setting/categorization')
    redirect('/suyo/setting/categorization')
}