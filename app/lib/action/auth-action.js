'use server'

import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'
import { signIn } from '@/auth'
import { stateInfo } from '@/app/lib/action/state.js'

export async function authenticate(prevState, formData) {
    const email = formData.get('email')
    const password = formData.get('password')
    const redirectUrl = formData.get('redirectUrl')

    if (!email.trim() || !password.trim()) {
        return stateInfo('有必填项为空')
    }

    try {
        await signIn('credentials', formData)
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return stateInfo('用户名或密码错误')
                default:
                    return stateInfo('糟糕!!! 出现了一些问题，登录失败')
            }
        }
    }

    if (redirectUrl === '') {
        redirect('/suyo')
    } else {
        redirect(redirectUrl)
    }
}