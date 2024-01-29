export default function LargeBody(props) {
    return (
        <p style={{ fontSize: 'var(--largeBody)' }}>
            {props.children}
        </p>
    )
}