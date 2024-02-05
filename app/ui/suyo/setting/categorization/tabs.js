import TabUpdateForm from '@/app/ui/suyo/setting/categorization/tab-update-form'
import categorizationService from '@/app/lib/db/categorization-service'

export default async function TabUpdateFormWrapper() {
    const categorizations = await categorizationService.getAll()

    return (
        <>
            {categorizations.map((item) => {
                return (
                    <TabUpdateForm
                        key={item.uid}
                        title={item.title}
                        url={item.url}
                        description={item.description}
                        uid={item.uid} />
                )
            })}
        </>
    )
}