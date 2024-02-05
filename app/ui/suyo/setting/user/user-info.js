'use client'

import { useFormState } from 'react-dom'

import MediumBody from '@/app/ui/components/typography/medium-body'
import { editUsername } from '@/app/lib/action/user-action'
import Space from '@/app/ui/components/space'
import { formatTime } from '@/app/lib/utils/common'
import Button from '@/app/ui/components/button'
import ErrorTip from '@/app/ui/components/error-tip'

import styles from './user-info.module.css'

export default function UserInfo(props) {
    const initialState = { message: null, errors: {} }
    const [state, dispatch] = useFormState(editUsername, initialState)

    const { userInfo } = props

    return (
        <section>
            <form action={dispatch}>
                <div>
                    <input type='hidden' name='userUid' defaultValue={userInfo.uid} />
                    <input
                        type='text'
                        id='username'
                        name='username'
                        placeholder='用户名'
                        defaultValue={userInfo.username}
                        required />
                    <Space />
                    <label htmlFor='username'>
                        <MediumBody>
                            显示的名称,修改后页面其他区域的用户名显示可能需要重新登录才会发生变化。
                        </MediumBody>
                    </label>
                </div>
                <Space magnification={2} />
                <div>
                    <input
                        type='text'
                        id='email'
                        defaultValue={userInfo.email}
                        disabled />
                    <Space />
                    <label htmlFor='email'>
                        <MediumBody>
                            登录邮箱
                        </MediumBody>
                    </label>
                </div>
                <Space magnification={2} />
                <div>
                    <input
                        type='text'
                        id='update_timestamp'
                        defaultValue={formatTime(userInfo.update_timestamp)}
                        disabled />
                    <Space />
                    <label htmlFor='update_timestamp'>
                        <MediumBody>
                            上次修改时间
                        </MediumBody>
                    </label>
                </div>
                <Space magnification={2} />
                <div>
                    <input
                        type='text'
                        id='create_timestamp'
                        defaultValue={formatTime(userInfo.create_timestamp)}
                        disabled />
                    <Space />
                    <label htmlFor='create_timestamp'>
                        <MediumBody>
                            创建时间
                        </MediumBody>
                    </label>
                </div>
                <Space magnification={2} />
                <Button type='submit'>
                    修改
                </Button>
                <Space />
                <ErrorTip state={state} />
            </form>
        </section>
    )
}