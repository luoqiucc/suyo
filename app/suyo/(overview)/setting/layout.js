import Space from '@/app/ui/components/space'
import MediumTitle from '@/app/ui/components/typography/medium-Title'

export const metadata = {
    title: {
        template: '%s | SUYO设置',
        default: 'SUYO设置',
    },
    description: "对应用进行自定义",
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