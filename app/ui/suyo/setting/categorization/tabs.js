import TabUpdateForm from '@/app/ui/components/tab-update-form'
import categorizationService from '@/app/lib/db/categorization-service'

export default async function TabUpdateFormWrapper() {
    const result = await categorizationService.getAll()

    return (
        <>
            {result.map((item) => {
                return (
                    <TabUpdateForm
                        key={item.uid}
                        categorizationName={item.categorization_name}
                        categorizationUrl={item.categorization_url}
                        categorizationDescription={item.description}
                        categorizationUid={item.uid} />
                )
            })}
        </>
    )
}