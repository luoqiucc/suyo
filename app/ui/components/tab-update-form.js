'use client'

import { useFormState } from 'react-dom'
import { IconTrash } from '@tabler/icons-react'
import { IconEdit } from '@tabler/icons-react'

import MediumBody from '@/app/ui/components/typography/medium-body'
import ExtremeSmallTitle from '@/app/ui/components/typography/extremeSmall-title'
import Space from '@/app/ui/components/space'
import Dialog from '@/app/ui/components/dialog'
import Button from '@/app/ui/components/button'
import {
    removeCategorization,
    editCategorization
} from '@/app/lib/action/categorization-action'

import styles from './tabUpdateForm.module.css'

export default function TabUpdateForm(props) {
    const initialState = { message: null, errors: {} }
    const [removeState, removeDispatch] = useFormState(removeCategorization, initialState)
    const [editState, editDispatch] = useFormState(editCategorization, initialState)

    const {
        categorizationName = 'null',
        categorizationUrl = '#',
        categorizationUID = 'null',
        categorizationDescription = '无描述'
    } = props

    function Edit() {
        return (
            <form
                action={editDispatch}
                className={styles.form}>
                <input
                    hidden
                    defaultValue={categorizationUID}
                    name='categorizationUID'
                />
                <div>
                    <input
                        className={styles.input}
                        type='text'
                        id='categorization_name'
                        name="categorizationName"
                        defaultValue={categorizationName}
                        placeholder='分类名称'
                        required />
                    <Space />
                    <label htmlFor='categorization_name'>
                        <MediumBody>
                            分类的名字
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
                        defaultValue={categorizationUrl}
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
                        defaultValue={categorizationDescription}
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
                    修改分类
                </Button>
            </form>
        )
    }

    return (
        <span className={styles.tab}>
            <div className={styles.tabContent}>
                <div>
                    <ExtremeSmallTitle>
                        {categorizationName}
                    </ExtremeSmallTitle>
                </div>

                <Dialog
                    className={styles.editIcon}
                    button={<IconEdit size={20} />}
                    body={<Edit />}
                    title='修改分类信息' />

                <form
                    action={removeDispatch}
                    style={{ height: '20px', overflow: 'hidden' }}>
                    <input
                        hidden
                        defaultValue={categorizationUID}
                        name='categorizationUID'
                    />
                    <button className={styles.delIcon} type='submit'>
                        <IconTrash size={20} />
                    </button>
                </form>
            </div>
        </span>
    )
}