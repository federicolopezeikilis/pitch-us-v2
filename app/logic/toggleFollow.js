import { validateJWT, validateStringNotEmptyNoSpaces, validateRank } from 'validators'
import Apium from '../vendor/Apium'

export async function toggleFollow(token, userId) {
    validateJWT(token)
    validateStringNotEmptyNoSpaces(userId)

    const api = new Apium(process.env.NEXT_PUBLIC_API_URL)

    const { status, payload } = await api.post(
        `users/${userId}/follow`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })

    if (status === 204) return

    else if (status >= 400 && status < 500) {
        const data = JSON.parse(payload)

        throw new Error(data.error)

    } else
        throw new Error('server error')
}