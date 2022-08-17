import Apium from '../vendor/Apium'
import { getToken } from 'next-auth/jwt'

export async function verifyTokenAndRedirect(req, res) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    if (token && token.tokenFromApi) {
        const { tokenFromApi } = token

        const api = new Apium(process.env.NEXT_PUBLIC_API_URL)

        const { status } = await api.get('users/auth', {
            headers: {
                Authorization: `Bearer ${tokenFromApi}`
            }
        })

        if (status === 200) {
            if (req.url.includes('/login') || req.url.includes('/register')) {
                res.writeHead(307, { Location: '/' })
                res.end()

            } else return tokenFromApi

        } else if (status === 401 || status === 404) return null
    }

    if (req.url.includes('/settings') || req.url.includes('/create-interpretation')) {
        res.writeHead(307, { Location: '/login' })
        res.end()
    }
}
