import StatusBar from '@/app/ui/status-bar'

import LoginInfo from '@/app/ui/suyo/login-info'
import Space from '@/app/ui/components/space'

import styles from './layout.module.css'

export default async function Layout({ children }) {
    return (
        <>
            <StatusBar />
            <main className={styles.main}>
                <LoginInfo />
                <Space />
                {children}
            </main>
        </>
    )
}