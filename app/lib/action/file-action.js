'use server'

import { getUid } from '@/app/lib/utils/uid'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { stateInfo } from '@/app/lib/error'
import docService from '@/app/lib/db/doc-service'
import authorizedService from '@/app/lib/db/authorized-service'

export async function uploadFile(prevState, formData) {
    const files = formData.getAll('files')

    try {
        // TODO: 
        const userId = await authorizedService.createDocAuth()
        await docService.create(getUid(), '我的奋斗', '希儿', '', userId)

        files.forEach(async (item) => {
            const bytes = await item.arrayBuffer()
            let buffer = Buffer.from(bytes)

            /**
             * item=>
             *  File {
             *      size: 158628277,
             *      type: 'video/mp4',
             *      name: '13815-720p.mp4',
             *      lastModified: 1707141643389
             *  }
             */
            buffer = null
        })
    } catch (error) {
        return stateInfo(error.message)
    }

    revalidatePath('/suyo/manager')
    redirect('/suyo/manager')
}