import Cookies from 'cookies'
import Apium from '../vendor/Apium'

export async function verifyTokenAndRedirect(req, res) {
    const cookies = new Cookies(req, res)

    const token = cookies.get('token')

    if (token) {
        const api = new Apium(process.env.NEXT_PUBLIC_API_URL)

        const { status } = await api.get('users/auth', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (status === 200) {
            if (req.url.includes('/login') || req.url.includes('/register')) {
                res.writeHead(307, { Location: '/' })
                res.end()

            } else return token

        } else if (status === 401 || status === 404) cookies.set('token')
    }

    if (req.url.includes('/settings') || req.url.includes('/create-interpretation')) {
        res.writeHead(307, { Location: '/login' })
        res.end()
    }
}
