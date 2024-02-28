'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import settingService from '@/app/lib/db/setting-service'

export async function updateSetting(prevState, formData) {
    const value = formData.get('value')
    const uid = formData.get('uid')

    await settingService.updateValueByUid(uid, value)

    revalidatePath('/suyo/setting')
    redirect('/suyo/setting')
}