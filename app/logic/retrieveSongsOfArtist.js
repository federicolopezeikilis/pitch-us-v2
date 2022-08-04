import { validateStringNotEmptyOrBlank } from 'validators'
import Apium from '../vendor/Apium'

export async function retrieveSongsOfArtist(artistName) {
validateStringNotEmptyOrBlank(artistName) 

    const api = new Apium(process.env.NEXT_PUBLIC_API_URL)

    const { status, payload } = await api.get(
        `artists/${artistName}/songs`)

    const data = JSON.parse(payload)
    
    if (status === 200) return data

    else if (status >= 400 && status < 500) throw new Error(data.error)

    else if (status >= 500) throw new Error('server error')
}