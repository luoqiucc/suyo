import docService from '@/app/lib/db/doc-service'
import Space from '../../components/space'
import MediumBody from '../../components/typography/medium-body'
import Card from '../../components/card'

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
                        <Card>
                            {item.title}
                            <Space />
                            <MediumBody>{item.creator}</MediumBody>
                            <MediumBody>{item.publisher}</MediumBody>
                            <MediumBody>{item.date}</MediumBody>
                            <MediumBody>{item.description}</MediumBody>
                        </Card>
                        <Space magnification={2} />
                    </div>
                )
            })}
        </>
    )
}