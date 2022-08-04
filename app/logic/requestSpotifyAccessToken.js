import { validateJWT } from 'validators'
import Apium from '../vendor/Apium'

export async function requestSpotifyAccessToken(token, code, state) {
    validateJWT(token)
    // TODO VALIDATE CODE
    // TODO VALIDATE STATE

    const api = new Apium(process.env.NEXT_PUBLIC_API_URL)

    const { status, payload } = await api.post(
        'spotify/auth',
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ code, state })
        })

    const data = JSON.parse(payload)

    if (status === 200) return data.access_token

    else if (status >= 400 && status < 500) {

        throw new Error(data.error)

    } else
        throw new Error('server error')
}