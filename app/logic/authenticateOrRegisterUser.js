import { validateEmail, validateStringNotEmptyNoSpaces, validateStringNotEmptyOrBlank } from 'validators'
import Apium from '../vendor/Apium'

export async function authenticateOrRegisterUser({ email, username, providerName, providerId, firstName, lastName }) {
    validateEmail(email)
    validateStringNotEmptyOrBlank(username)
    validateStringNotEmptyNoSpaces(providerName)
    validateStringNotEmptyNoSpaces(providerId)
    if (firstName) validateStringNotEmptyOrBlank(firstName)
    if (lastName) validateStringNotEmptyOrBlank(lastName)

    const api = new Apium(process.env.NEXT_PUBLIC_API_URL)

    const { status, payload } = await api.post(
        'users/auth/providers',
        {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, username, providerName, providerId, firstName, lastName })
        })

    const data = JSON.parse(payload)

    if (status === 200) return data.token

    else if (status >= 400 && status < 500) throw new Error(data.error)

    else if (status >= 500) throw new Error('server error')
}
