import Space from '@/app/ui/components/space'
import ExtremeSmallTitle from '@/app/ui/components/typography/extremeSmall-title'
import LargeBody from '@/app/ui/components/typography/large-body'
import CreateForm from '@/app/ui/suyo/setting/categorization/create-form'
import TabWrapper from '@/app/ui/suyo/setting/categorization/tabs'

export const metadata = {
    title: '分类设置',
    description: '分类设置',
}

export default function CategorizationSetting() {
    return (
        <>
            <ExtremeSmallTitle>分类设置</ExtremeSmallTitle>
            <Space magnification={3} />
            <LargeBody>添加新分类</LargeBody>
            <Space />
            <CreateForm />
            <Space magnification={3} />
            <LargeBody>已存在分类</LargeBody>
            <Space />
            <TabWrapper />
        </>
    )
}