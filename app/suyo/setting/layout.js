import Space from '@/app/ui/components/space'
import MediumTitle from '@/app/ui/components/typography/medium-Title'

export const metadata = {
    title: '设置',
    description: '应用设置',
}

export default function Layout({ children }) {
    return (
        <>
            <MediumTitle>设置</MediumTitle>
            <Space />
            {children}
        </>
    )
}