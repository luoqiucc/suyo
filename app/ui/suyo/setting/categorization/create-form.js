'use client'

import { useFormState } from 'react-dom'

import { createCategorization } from '@/app/lib/action/categorization-action'
import Space from '@/app/ui/components/space'
import MediumBody from '@/app/ui/components/typography/medium-body'
import Button from '@/app/ui/components/button'
import ErrorTip from '@/app/ui/components/error-tip'

import styles from './create-form.module.css'

export default function CreateCategorizationForm() {
    const initialState = { message: null, errors: {} }
    const [state, dispatch] = useFormState(createCategorization, initialState)

    return (
        <form action={dispatch}>
            <div>
                <input
                    type='text'
                    id='new_title'
                    name='title'
                    placeholder='新分类名称'
                    required />
                <Space />
                <label htmlFor='new_title'>
                    <MediumBody>
                        新分类的名字
                    </MediumBody>
                </label>
            </div>
            <Space magnification={2} />
            <div>
                <input
                    type='text'
                    id='new_url'
                    name='url'
                    placeholder='分类Url' />
                <Space />
                <label htmlFor='new_url'>
                    <MediumBody>
                        分类url是指在浏览器地址栏中显示的内容，若不设置系统将自动分配
                    </MediumBody>
                </label>
            </div>
            <Space magnification={2} />
            <div>
                <input
                    type='text'
                    id='new_description'
                    name='description'
                    placeholder='分类描述' />
                <Space />
                <label htmlFor='new_description'>
                    <MediumBody>
                        该分类的简要描述
                    </MediumBody>
                </label>
            </div>
            <Space magnification={2} />
            <Button type='submit'>
                添加分类
            </Button>
            <Space />
            <ErrorTip state={state} />
        </form>
    )
}