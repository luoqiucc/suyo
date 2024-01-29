import StatusBar from '@/app/ui/status-bar'

import styles from './layout.module.css'

export default function Layout({ children }) {
    return (
        <>
            <StatusBar />
            <main className={styles.main}>
                {children}
            </main>
        </>
    )
}