import styles from './skeletons.module.css'

function DocCardSkeleton() {
    return (
        <section className={styles.docCardSkeleton}>

        </section>
    )
}

export function DocCardsSkeleton() {
    return (
        <div className={styles.docCardSkeletonGroup}>
            <DocCardSkeleton />
            <DocCardSkeleton />
            <DocCardSkeleton />
            <DocCardSkeleton />
        </div>
    )
}

