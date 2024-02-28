export const authConfig = {
    pages: {
        signIn: '/login'
    },
    trustHost: true,
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth
            const isSetting = nextUrl.pathname.startsWith('/suyo/setting')
            const isManager = nextUrl.pathname.startsWith('/suyo/manager')

            if (isSetting || isManager) {
                if (isLoggedIn) {
                    return true
                }
                return false
            }

            return true
        }
    },
    providers: []
}