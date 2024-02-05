import docService from '@/app/lib/db/doc-service'

export default async function DocTableWrapper(props) {
    const {
        currentPage = 1,
        categorization
    } = props

    const constraints = {
        currentPage,
        categorization
    }

    const docs = await docService.getDocsByConstraints(constraints)

    return (
        <>
            {docs.map((item) => {
                return (
                    <div key={item.uid}>
                        {item.title}
                    </div>
                )
            })}
        </>
    )
}