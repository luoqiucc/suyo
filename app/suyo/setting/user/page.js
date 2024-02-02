import ExtremeSmallTitle from '@/app/ui/components/typography/extremeSmall-title'
import Space from '@/app/ui/components/space'

export const metadata = {
    title: '用户设置',
    description: '用户设置',
}

export default async function UserSetting() {
    return (
        <>
            <ExtremeSmallTitle>用户设置</ExtremeSmallTitle>
            <Space magnification={3} />

        </>
    )
}