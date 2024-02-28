import chapterService from '@/app/lib/db/chapter-service'
import DocReaderWrapper from '@/app/ui/suyo/reader/doc-reader'
import CatalogueBar from '@/app/ui/components/catalogue-bar'

import styles from './page.module.css'

export const metadata = {
    title: '阅读',
    description: '阅读',
}

export default async function Reader({ params, searchParams }) {
    const docUid = searchParams.uid || null
    let chapterUid = searchParams.chapter || null
    const catalogue = await chapterService.getDocCatalogueByUid(docUid)

    if (!chapterUid) {
        chapterUid = catalogue[0].uid
    }

    return (
        <div>
            <section className={styles.browse}>
                <CatalogueBar catalogue={catalogue} />
                <DocReaderWrapper chapterUid={chapterUid} />
            </section>
        </div>
    )
}