import { validateJWT } from 'validators'
import Apium from '../vendor/Apium'

export async function getTopArtists(token) {
    validateJWT(token)

    const api = new Apium(process.env.NEXT_PUBLIC_API_URL)

    const { status, payload } = await api.post(
        'artists/top',
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })

    const data = JSON.parse(payload)
    if (status === 200) return data
    else if (status >= 400 && status < 500) throw new Error(data.error)
    else if (status === 500 && data.error === 'Error in top artists with Spotify') return []
    else throw new Error('server error')
}