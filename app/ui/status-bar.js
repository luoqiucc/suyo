'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { IconMenu2 } from '@tabler/icons-react'
import SmallTitle from '@/app/ui/components/typography/small-title'
import ExtremeSmallTitle from '@/app/ui/components/typography/extremeSmall-title'
import LargeTitle from '@/app/ui/components/typography/large-title'
import Space from '@/app/ui/components/space'

import styles from './statusBar.module.css'

const links = [
    {
        name: '文档',
        href: '/suyo'
    },
    {
        name: '设置',
        href: '/suyo/setting',
        children: [
            {
                name: '分类设置',
                href: '/suyo/setting/categorization'
            },
            {
                name: '用户设置',
                href: '/suyo/setting/user'
            },
        ]
    }
]

export default function StatusBar() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    return (
        <>
            <section
                className={styles.menu}
                onClick={() => {
                    setIsOpen(!isOpen)
                }}>
                <IconMenu2 size={30} />
            </section>
            <section
                className={clsx(
                    styles.menuContent,
                    {
                        [styles.open]: isOpen
                    }
                )}>
                <LargeTitle>SUYO</LargeTitle>
                <Space magnification={3} />
                <div
                    onClick={() => {
                        setIsOpen(!isOpen)
                    }}>
                    <div className={styles.menuLink}>
                        {links.map((item) => {
                            return (
                                <div key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={clsx(
                                            styles.menuItem,
                                            {
                                                [styles.menuItemActive]: pathname === item.href
                                            }
                                        )}>
                                        <SmallTitle>
                                            {item.name}
                                        </SmallTitle>
                                    </Link>
                                    <Space />
                                    {item.children && item.children.map((childrenItem) => {
                                        return (
                                            <div key={childrenItem.href}>
                                                <Link
                                                    href={childrenItem.href}
                                                    className={clsx(
                                                        styles.menuItem,
                                                        styles.menuChildrenItem,
                                                        {
                                                            [styles.menuItemActive]: pathname === childrenItem.href
                                                        }
                                                    )}>
                                                    <ExtremeSmallTitle>
                                                        {childrenItem.name}
                                                    </ExtremeSmallTitle>
                                                </Link>
                                                <Space />
                                            </div>
                                        )
                                    })}
                                    <Space />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}