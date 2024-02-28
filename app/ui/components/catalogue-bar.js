'use client'

import {
    useSearchParams,
    usePathname,
    useRouter
} from 'next/navigation'

import styles from './catalogueBar.module.css'

export default function CatalogueBar(props) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const { catalogue = [] } = props

    function handleSearch(chapterUid) {
        const params = new URLSearchParams(searchParams)
        if (chapterUid) {
            params.set('chapter', chapterUid)
        } else {
            params.delete('chapter')
        }
        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <section>
            <ul>
                {catalogue.map((item) => {
                    return (
                        <li
                            key={item.id}
                            onClick={() => handleSearch(item.uid)}>
                            {item.title}
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}