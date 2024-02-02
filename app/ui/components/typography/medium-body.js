export default function MediumBody(props) {
    return (
        <p
            style={{
                ...props.style,
                fontSize: 'var(--mediumBody)'
            }}>
            {props.children}
        </p>
    )
}