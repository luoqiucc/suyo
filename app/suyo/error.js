'use client'

import ExtremeSmallTitle from '@/app/ui/components/typography/extremeSmall-title'
import Button from '@/app/ui/components/button'
import Link from 'next/link'
import Space from '@/app/ui/components/space'

export default function Error({ error, reset }) {
    return (
        <>
            <ExtremeSmallTitle>
                糟糕!!! 似乎是应用内部出了些问题，你可以点击下面的按钮尝试重新运行或是返回到首页
            </ExtremeSmallTitle>
            <Space />
            <Button
                onClick={() => {
                    reset()
                }}>
                重试
            </Button>
            <br />
            <Space />
            <Link href='/'>
                <Button>
                    返回首页
                </Button>
            </Link>
        </>
    )
}