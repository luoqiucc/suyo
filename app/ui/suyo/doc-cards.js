import docService from '@/app/lib/db/doc-service'

import DocCard from '@/app/ui/components/doc-card'
import Grid from '@/app/ui/components/grid'

export default async function DocCardWrapper(props) {
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
        <Grid>
            {docs.map((item) => {
                return (
                    <DocCard key={item.uid} title={item.doc_name} />
                )
            })}
        </Grid>
    )
}