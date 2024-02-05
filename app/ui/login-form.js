'use client'

import { useFormState } from 'react-dom'
import { useSearchParams } from 'next/navigation'

import { authenticate } from '@/app/lib/action/auth-action'
import Space from '@/app/ui/components/space'
import MediumBody from '@/app/ui/components/typography/medium-body'
import Button from '@/app/ui/components/button'
import Card from '@/app/ui/components/card'
import SmallTitle from '@/app/ui/components/typography/small-title'
import ErrorTip from './components/error-tip'

import styles from './login-form.module.css'

export default function LoginForm() {
    const initialState = { message: null, errors: {} }
    const [state, dispatch] = useFormState(authenticate, initialState)
    const searchParams = useSearchParams()

    return (
        <div className={styles.login}>
            <Card className={styles.card}>
                <SmallTitle>
                    登录
                </SmallTitle>
                <Space magnification={2} />
                <form
                    action={dispatch}
                    className={styles.form}>
                    <input
                        type='hidden'
                        name='redirectUrl'
                        defaultValue={new URLSearchParams(searchParams).get('callbackUrl')} />
                    <div>
                        <input
                            type='text'
                            id='email'
                            name='email'
                            placeholder='邮箱'
                            required />
                        <Space />
                        <label htmlFor='email'>
                            <MediumBody>
                                你的登录邮箱
                            </MediumBody>
                        </label>
                    </div>
                    <Space magnification={2} />
                    <div>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            placeholder='密码'
                            required />
                        <Space />
                        <label htmlFor='password'>
                            <MediumBody>
                                你的登录密码
                            </MediumBody>
                        </label>
                    </div>
                    <Space magnification={2} />

                    <Button type='submit'>
                        登录
                    </Button>
                </form>
                <Space />
                <ErrorTip state={state} />
            </Card>
        </div>
    )
}