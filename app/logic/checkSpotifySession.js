import { validateJWT } from 'validators'
import Apium from '../vendor/Apium'

export async function checkSpotifySession(token, code) {
    validateJWT(token)
    //TODO VALIDATE CODE

    const api = new Apium(process.env.NEXT_PUBLIC_API_URL)

    let url = 'spotify/auth'

    if (code)
        url += `?code=${code}`

    const { status, payload } = await api.post(
        url,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

    if (status === 200) {
        const data = JSON.parse(payload)

        return data.isSessionActive
    } else if (status >= 400 && status < 500) {
        const data = JSON.parse(payload)

        throw new Error(data.error)
    } else if (status >= 500) throw new Error('server error')
}