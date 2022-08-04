import { validateJWT, validateStringNotEmptyOrBlank, validateGenres, validateCountryCode } from 'validators'
import Apium from '../vendor/Apium'

export async function createArtist(token, name, genres, country) {
    validateJWT(token)
    validateStringNotEmptyOrBlank(name, 'artist name')
    if (genres) validateGenres(genres)
    if (country) validateCountryCode(country)

    const api = new Apium(process.env.NEXT_PUBLIC_API_URL)

    const { status, payload } = await api.post(
        'artists',
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, genres, country })
        })

    const data = JSON.parse(payload)

    if (status === 201) return data.id

    else if (status >= 400 && status < 500) {

        throw new Error(data.error)

    } else
        throw new Error('server error')
}