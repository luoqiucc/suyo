export default function Space(props) {
    const { magnification = 1 } = props

    return <div style={{ height: `calc(${magnification} * var(--space))` }} />
}