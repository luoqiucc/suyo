import Space from '@/app/ui/components/space'
import ExtremeSmallTitle from '@/app/ui/components/typography/extremeSmall-title'
import MediumBody from '@/app/ui/components/typography/medium-body'
import LargeBody from '@/app/ui/components/typography/large-body'
import MediumTitle from '@/app/ui/components/typography/medium-Title'
import UploadForm from '@/app/ui/suyo/manager/upload-form'
import DocTableWrapper from '@/app/ui/suyo/manager/doc-tables'
import { Suspense } from 'react'

export const metadata = {
    title: '管理文档',
    description: '管理你的文档',
}

export default async function Manager({ params, searchParams }) {
    const categorization = searchParams.categorization || null
    const page = searchParams.page

    return (
        <>
            <MediumTitle>文档</MediumTitle>
            <Space />
            <ExtremeSmallTitle>文档上传 & 批量管理</ExtremeSmallTitle>
            <Space magnification={3} />
            <LargeBody>上传新文档</LargeBody>
            <Space />
            <UploadForm />
            <Space magnification={3} />
            <LargeBody>批量管理</LargeBody>
            <Space />
            <DocTableWrapper />
        </>
    )
}