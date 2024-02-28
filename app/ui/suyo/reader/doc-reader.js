import contentService from '@/app/lib/db/content-service'
import DocReader from '@/app/ui/doc-reader'

import styles from './docReader.module.css'

export default async function DocReaderWrapper(props) {
    const {
        chapterUid
    } = props

    const content = await contentService.getContentByChapterUid(chapterUid)

    return (
        <section className={styles.reader}>
            <DocReader
                body={content[0].body}
                styles={content[0].style} />
        </section>
    )
}