export const authConfig = {
    pages: {
        signIn: '/login'
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth
            const isSetting = nextUrl.pathname.startsWith('/suyo/setting')

            if (isSetting) {
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