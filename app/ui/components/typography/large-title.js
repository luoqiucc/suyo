export default function LargeTitle(props) {
    return (
        <h1 style={{ fontSize: 'var(--largeTitle)' }}>
            {props.children}
        </h1>
    )
}