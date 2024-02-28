import ExtremeSmallTitle from '@/app/ui/components/typography/extremeSmall-title'
import LargeBody from '@/app/ui/components/typography/large-body'
import Space from '@/app/ui/components/space'
import UserInfo from '@/app/ui/suyo/setting/user/user-info'
import { auth } from '@/auth'
import userService from '@/app/lib/db/user-service'
import CreateUserForm from '@/app/ui/suyo/setting/user/create-form'

export const metadata = {
    title: '用户设置',
    description: '用户设置',
}

async function getLoginUser() {
    const session = await auth()
    let user = {
        name: null,
        email: null
    }

    if (session) {
        user.name = session.user.name
        user.email = session.user.email
    }

    return user
}

export default async function UserSetting() {

    const { email } = await getLoginUser()

    if (!email) {
        return <ExtremeSmallTitle>未登录</ExtremeSmallTitle>
    }

    const user = await userService.getUserByEmail(email)

    if (!user.length) {
        return <ExtremeSmallTitle>用户已不存在</ExtremeSmallTitle>
    }

    delete user[0].password

    return (
        <>
            <ExtremeSmallTitle>用户设置</ExtremeSmallTitle>
            <Space magnification={3} />
            <LargeBody>你的信息</LargeBody>
            <Space />
            <UserInfo userInfo={user[0]} />
            <Space magnification={3} />
            <LargeBody>添加新用户</LargeBody>
            <Space />
            <CreateUserForm />
            <Space magnification={3} />
            <LargeBody>权限管理</LargeBody>
            <Space />
            <Space magnification={3} />
        </>
    )
}