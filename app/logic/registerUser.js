import { AuthError } from 'errors'
import { validatePassword, validateUsername, validateEmail } from 'validators'
import Apium from '../vendor/Apium'

export async function registerUser(username, email, password, repeatPassword) {
    validateUsername(username)
    validateEmail(email)
    validatePassword(password)
    validatePassword(repeatPassword, 'repeat password')

    if (password !== repeatPassword) throw new AuthError('password and new password do not match')

    const api = new Apium(process.env.NEXT_PUBLIC_API_URL)

    const { status, payload } = await api.post(
        'users',
        {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        })

    if (status === 201) return

    else if (status >= 400 && status < 500) {
        const data = JSON.parse(payload)

        throw new Error(data.error)

    } else
        throw new Error('server error')
}