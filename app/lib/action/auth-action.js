'use server'

import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'

export async function authenticate(prevState, formData) {
    const email = formData.get('email')
    const password = formData.get('password')
    const redirectUrl = formData.get('redirectUrl')

    if (!email.trim() || !password.trim()) {
        return '有必填项为空'
    }

    try {
        await signIn('credentials', formData)
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return '用户名或密码错误'
                default:
                    return '糟糕!!! 出现了一些问题，登录失败'
            }
        }
    }

    // 这是临时解决无法自动重定向的方案，先手动进行跳转
    if (redirectUrl === '') {
        redirect('/suyo')
    } else {
        redirect(redirectUrl)
    }
}