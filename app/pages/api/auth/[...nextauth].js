import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Apium from '../../../vendor/Apium';

const options = {
    providers: [
        Providers.Credentials({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials property is used to generate a suitable form on the sign in page.
            credentials: {
                email: { label: "Email", type: "email", placeholder: "your email" },
                password: { label: "Password", type: "password", placeholder: "at least 8 characters" }
            },
            async authorize(credentials) {
                // Authentication Logic: local function, external API call, etc
                //const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                try {
                    const api = new Apium

                    const { status, payload } = await api.post(
                        'users/auth',
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ email: credentials.email, password: credentials.password })
                        })

                    const data = await JSON.parse(payload)

                    if (data.token) {
                        return true;
                    } else {
                        return null;
                    }
                } catch (e) {
                    throw new Error("There was an error on user authentication");
                }
            }
        })
    ],
    session: {
        jwt: true,
    },
    jwt: {
        // A secret to use for key generation - you should set this explicitly
        // Defaults to NextAuth.js secret if not explicitly specified.
        secret: 'charmander fuego',
    }
}

export default (req, res) => NextAuth(req, res, options);