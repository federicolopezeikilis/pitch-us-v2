import { validateJWT, validateStringNotEmptyOrBlank, validateGenres, validateDate, validateStringNotEmptyNoSpaces } from 'validators'
import Apium from '../vendor/Apium'

export async function createSong(token, { artist, name, genres, album, date }) {
    validateJWT(token)
    validateStringNotEmptyNoSpaces(artist)
    validateStringNotEmptyOrBlank(name, 'song name')
    if (genres) validateGenres(genres)
    if (album) validateStringNotEmptyOrBlank(album, 'album')
    if (date) validateDate(date)

    const api = new Apium(process.env.NEXT_PUBLIC_API_URL)

    const { status, payload } = await api.post(
        'songs',
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ artist, name, genres, album, date })
        })

    const data = JSON.parse(payload)

    if (status === 201) return data.id

    else if (status >= 400 && status < 500) {

        throw new Error(data.error)

    } else
        throw new Error('server error')
}