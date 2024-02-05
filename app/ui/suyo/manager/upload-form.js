'use client'

import { useState } from 'react'
import { useFormState } from 'react-dom'

import { uploadFile } from '@/app/lib/action/file-action'
import Button from '@/app/ui/components/button'
import Space from '@/app/ui/components/space'
import MediumBody from '@/app/ui/components/typography/medium-body'
import ErrorTip from '@/app/ui/components/error-tip'

export default function UploadForm() {
    const initialState = { message: null, errors: {} }
    const [state, dispatch] = useFormState(uploadFile, initialState)

    return (
        <form action={dispatch}>
            <div>
                <input
                    id='file'
                    type='file'
                    name='files'
                    multiple />
                <Space />
                <label htmlFor='file'>
                    <MediumBody>
                        可同时添加多个文件上传
                    </MediumBody>
                </label>
            </div>
            <Space magnification={2} />
            <Button type='submit'>
                全部上传
            </Button>
            <Space />
            <ErrorTip state={state} />
        </form>
    )
}