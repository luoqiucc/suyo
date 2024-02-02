export default function Card(props) {
    const {
        padding = 1,
        children,
        className
    } = props

    return (
        <section
            className={className}
            style={{
                padding: `calc(${padding} * var(--space))`,
                backgroundColor: 'white',
                boxShadow: 'var(--shadow)'
            }}>
            {children}
        </section>
    )
}