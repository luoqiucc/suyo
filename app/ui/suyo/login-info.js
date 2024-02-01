import {
    IconUserCircle,
    IconUsers,
    IconLogout
} from '@tabler/icons-react'
import Link from 'next/link'

import { auth, signOut } from '@/auth'
import ExtremeSmallTitle from '@/app/ui/components/typography/extremeSmall-title'

export default async function LoginInfo() {
    const session = await auth()
    let user = {
        name: 'null',
        email: 'null'
    }

    if (session) {
        user.name = session.user.name
        user.email = session.user.email
    }

    return (
        <section>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                {user.name !== 'null' ? (
                    <>
                        <IconUserCircle style={{ marginRight: 'calc(1 * var(--space))' }} size={24} />
                        <ExtremeSmallTitle>{user.name}</ExtremeSmallTitle>
                        <form
                            action={async () => {
                                'use server'
                                await signOut()
                            }}>
                            <button
                                style={{
                                    all: 'unset',
                                    cursor: 'pointer',
                                    height: '20px',
                                    overflow: 'hidden',
                                    display: 'block'
                                }}>
                                <IconLogout style={{ padding: '0 0 0 4px' }} size={22} />
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <IconUsers style={{ marginRight: 'calc(1 * var(--space))' }} size={24} />
                        <Link href='/login'>
                            <ExtremeSmallTitle>未登录</ExtremeSmallTitle>
                        </Link>
                    </>
                )}
            </div>
        </section>
    )
}