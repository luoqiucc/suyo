export default function MediumBody(props) {
    return (
        <p style={{ fontSize: 'var(--mediumBody)' }}>
            {props.children}
        </p>
    )
}