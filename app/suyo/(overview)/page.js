import MediumTitle from '@/app/ui/components/typography/medium-Title'
import CategorizationBarWrapper from '@/app/ui/suyo/categorization-bar'
import Space from '@/app/ui/components/space'
import DocCardWrapper from '@/app/ui/suyo/doc-cards'
import { Suspense } from 'react'

import {
    DocCardsSkeleton
} from '@/app/ui/components/skeletons'

export const metadata = {
    title: '主页',
    description: '主页',
}

export default async function Suyo({ params, searchParams }) {
    const categorization = searchParams.categorization || null
    const page = searchParams.page

    return (
        <>
            <MediumTitle>文档</MediumTitle>
            <Space magnification={2} />

            <CategorizationBarWrapper />
            <Space magnification={2} />
            <Suspense fallback={<DocCardsSkeleton />}>
                <DocCardWrapper categorization={categorization} currentPage={page} />
            </Suspense>
        </>
    )
}