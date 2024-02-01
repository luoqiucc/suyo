import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { authConfig } from './auth.config'
import userService from '@/app/lib/db/user-service'
import { passwordEncoding } from '@/app/lib/utils/auth'

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const { email, password } = credentials
                const user = await userService.getUserByEmail(email)

                if (!user.length) {
                    return null
                }

                if (user[0].password === passwordEncoding(password)) {
                    const {
                        username,
                        email
                    } = user[0]

                    return {
                        name: username,
                        email
                    }
                }

                return null
            }
        })
    ]
})