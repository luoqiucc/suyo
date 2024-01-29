import styles from './card.module.css'

export default function Card(props) {
    return (
        <section className={styles.card}>
            {props.children}
        </section>
    )
}