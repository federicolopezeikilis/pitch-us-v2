import { validateInterpretationContent, validateJWT, validateStringNotEmptyNoSpaces } from 'validators'
import Apium from '../vendor/Apium'

export async function addInterpretationToSong(token, songId, content) {
    validateJWT(token)
    validateStringNotEmptyNoSpaces(songId)
    validateInterpretationContent(content)

    const api = new Apium(process.env.NEXT_PUBLIC_API_URL)

    const { status, payload } = await api.post(
        `songs/${songId}/interpretations`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        })

    const data = JSON.parse(payload)

    if (status === 201) {
        return data.interpretationId

    } else if (status >= 400 && status < 500) {
        const data = JSON.parse(payload)

        throw new Error(data.error)

    } else
        throw new Error('server error')
}