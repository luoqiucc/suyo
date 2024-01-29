import CategorizationBar from '@/app/ui/components/categorization-bar'
import categorizationService from '@/app/lib/db/categorization-service'

export default async function CategorizationBarWrapper () {
    const categorizations = await categorizationService.getAll()

    return <CategorizationBar categorizations={categorizations} />
}