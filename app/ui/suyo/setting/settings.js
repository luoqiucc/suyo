import settingService from '@/app/lib/db/setting-service'
import SettingOptionsForm from '@/app/ui/components/setting-option-form'

export default async function SettingWrapper() {
    const setting = await settingService.getAll()

    return (
        <>
            {setting.map((item) => {
                return (
                    <SettingOptionsForm
                        key={item.id}
                        uid={item.uid}
                        title={item.title}
                        description={item.description}
                        value={item.value} />
                )
            })}
        </>
    )
}