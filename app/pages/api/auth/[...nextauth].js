import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import { authenticateUser, authenticateOrRegisterUser } from '../../../logic'

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Pitch Us',
            async authorize({email, password}) {
                debugger
                try {
                    const token = await authenticateUser(email, password)

                    return token
                } catch (error) {
                    return null
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    pages: {
        signIn: '/login',
        error: './login'
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
    callbacks: {
        async session({ session, user, token }) {
            session.tokenFromApi = token.tokenFromApi
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (account && account.provider === 'credentials' && user)
                token.tokenFromApi = user

            else if (account && account.provider === 'google') {
                token.tokenFromApi = await authenticateOrRegisterUser({ email: profile.email, username: profile.name, providerName: 'google', providerId: profile.sub, firstName: profile.given_name, lastName: profile.family_name })
            }

            return token
        }
    }
}

export default (req, res) => NextAuth(req, res, authOptions);