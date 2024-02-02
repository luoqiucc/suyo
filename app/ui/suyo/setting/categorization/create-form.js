'use client'

import { useFormState } from 'react-dom'
import { IconAlertCircle } from '@tabler/icons-react'

import { createCategorization } from '@/app/lib/action/categorization-action'
import Space from '@/app/ui/components/space'
import MediumBody from '@/app/ui/components/typography/medium-body'
import Button from '@/app/ui/components/button'

import styles from './create-form.module.css'

export default function Form() {
    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(createCategorization, initialState)

    return (
        <form
            action={dispatch}
            className={styles.form}>
            <div>
                <input
                    className={styles.input}
                    type='text'
                    id='categorization_name'
                    name="categorizationName"
                    placeholder='新分类名称'
                    required />
                <Space />
                <label htmlFor='categorization_name'>
                    <MediumBody>
                        新分类的名字
                    </MediumBody>
                </label>
            </div>
            <Space magnification={2} />
            <div>
                <input
                    className={styles.input}
                    type='text'
                    id='categorization_url'
                    name="categorizationUrl"
                    placeholder='分类Url' />
                <Space />
                <label htmlFor='categorization_url'>
                    <MediumBody>
                        分类url是指在浏览器地址栏中显示的内容，若不设置系统将自动分配
                    </MediumBody>
                </label>
            </div>
            <Space magnification={2} />
            <div>
                <input
                    className={styles.input}
                    type='text'
                    id='categorization_description'
                    name="categorizationDescription"
                    placeholder='分类描述' />
                <Space />
                <label htmlFor='categorization_description'>
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
            {!(state.errors.errorMessage === 'NEXT_REDIRECT' || !state.errors.errorMessage) && (
                <div
                    style={{
                        color: 'red',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                    <IconAlertCircle size={24} />
                    <MediumBody style={{ marginLeft: 'calc(1 * var(--space))' }}>
                        {state.errors.errorMessage}
                    </MediumBody>
                </div>
            )}
        </form>
    )
}