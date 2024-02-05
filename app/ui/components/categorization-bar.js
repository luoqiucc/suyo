'use client'

import {
    useSearchParams,
    usePathname,
    useRouter
} from 'next/navigation'
import clsx from 'clsx'

import MediumBody from '@/app/ui/components/typography/medium-body'

import styles from './categorizationBar.module.css'

export default function CategorizationBar(props) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const { categorizations = [] } = props

    function handleSearch(categorizationParams) {
        const params = new URLSearchParams(searchParams)
        if (categorizationParams) {
            params.set('categorization', categorizationParams)
        } else {
            params.delete('categorization')
        }
        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <section className={styles.categorizationBar}>
            <span
                className={clsx(
                    styles.tabsItem,
                    {
                        [styles.active]: !searchParams.get('categorization')
                    }
                )}
                onClick={() => {
                    handleSearch()
                }}>
                <MediumBody>
                    全部
                </MediumBody>
            </span>
            {categorizations.map((item) => {
                return (
                    <span
                        key={item.uid}
                        className={clsx(
                            styles.tabsItem,
                            {
                                [styles.active]:
                                    item.url === searchParams.get('categorization')
                            }
                        )}
                        onClick={() => {
                            handleSearch(item.url)
                        }}>
                        <MediumBody>
                            {item.title}
                        </MediumBody>
                    </span>
                )
            })}
        </section>
    )
}