export default function MediumTitle(props) {
    return (
        <h3 style={{ fontSize: 'var(--mediumTitle)' }}>
            {props.children}
        </h3>
    )
}