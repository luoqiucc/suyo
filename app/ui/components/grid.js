export default function Grid(props) {
    return (
        <div
            style={{
                display: 'grid',
                grid: 'auto-flow / repeat(auto-fill, minmax(90px, 1fr))',
                gap: 'calc(3 * var(--space))'
            }}>
            {props.children}
        </div>
    )
}