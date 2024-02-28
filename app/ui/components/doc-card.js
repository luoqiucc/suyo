import Image from 'next/image'
import Link from 'next/link'
import MediumBody from '@/app/ui/components/typography/medium-body'
import Space from './space'

import styles from './docCard.module.css'

export default function DocCard(props) {
    const {
        title = null,
        coverImg = null,
        uid = ''
    } = props

    return (
        <Link href={'/suyo/reader?uid=' + uid}>
            <section className={styles.docCard}>
                <div className={styles.cover}>
                    {coverImg ? (
                        <Image
                            src={coverImg}
                            alt='cover'
                            fill
                            sizes='(max-width: 375px) 50px, 100px'
                            style={{
                                objectFit: 'cover',
                            }} />
                    ) : (
                        <Image
                            src='/images/default_cover.png'
                            alt='cover'
                            fill
                            sizes='(max-width: 375px) 50px, 100px'
                            style={{
                                objectFit: 'cover',
                            }} />
                    )}
                </div>
                <Space />
                <div>
                    <MediumBody>
                        {title}
                    </MediumBody>
                </div>
                <Space />
            </section>
        </Link>
    )
}