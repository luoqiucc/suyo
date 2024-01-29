export default function SmallTitle(props) {
    return (
        <h5 style={{ fontSize: 'var(--smallTitle)' }}>
            {props.children}
        </h5>
    )
}