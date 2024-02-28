import { Suspense } from 'react'
import LoginForm from '@/app/ui/login-form'

export const metadata = {
    title: '登录',
    description: '登录',
}

export default function Login() {
    return (
        <Suspense>
            <LoginForm />
        </Suspense>
    )
}