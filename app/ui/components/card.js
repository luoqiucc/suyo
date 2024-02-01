import clsx from 'clsx'

import styles from './card.module.css'

export default function Card(props) {
    const {
        padding = 1,
        children,
        className
    } = props

    return (
        <section
            className={clsx(
                styles.card,
                className
            )}
            style={{
                padding: `calc(${padding} * var(--space))`,
            }}>
            {children}
        </section>
    )
}