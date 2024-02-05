'use client'

import { useFormState } from 'react-dom'

import { createUser } from '@/app/lib/action/user-action'
import Space from '@/app/ui/components/space'
import MediumBody from '@/app/ui/components/typography/medium-body'
import Button from '@/app/ui/components/button'
import ErrorTip from '@/app/ui/components/error-tip'

export default function CreateUserForm() {
    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(createUser, initialState)

    return (
        <form action={dispatch}>
            <div>
                <input
                    type='text'
                    id='new_username'
                    name='username'
                    placeholder='用户名'
                    required />
                <Space />
                <label htmlFor='new_username'>
                    <MediumBody>
                        新用户的显示名称
                    </MediumBody>
                </label>
            </div>
            <Space magnification={2} />
            <div>
                <input
                    type='password'
                    id='new_password'
                    name="password"
                    placeholder='密码'
                    required />
                <Space />
                <label htmlFor='new_password'>
                    <MediumBody>
                        登录密码
                    </MediumBody>
                </label>
            </div>
            <Space magnification={2} />
            <div>
                <input
                    type='text'
                    id='new_email'
                    name='email'
                    placeholder='邮箱'
                    required />
                <Space />
                <label htmlFor='new_email'>
                    <MediumBody>
                        登录邮箱
                    </MediumBody>
                </label>
            </div>
            <Space magnification={2} />
            <Button type='submit'>
                添加用户
            </Button>
            <Space />
            <ErrorTip state={state} />
        </form>
    )
}