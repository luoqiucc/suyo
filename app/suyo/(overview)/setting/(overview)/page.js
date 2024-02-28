import ExtremeSmallTitle from '@/app/ui/components/typography/extremeSmall-title'
import SettingWrapper from '@/app/ui/suyo/setting/settings'

export const metadata = {
    title: '通用设置',
    description: '通用设置',
}

export default async function Setting() {
    return (
        <>
            <ExtremeSmallTitle>通用设置</ExtremeSmallTitle>
            <SettingWrapper />
        </>
    )
}