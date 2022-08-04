import { AuthError, ConflictError } from 'errors'
import { validateJWT, validatePassword } from 'validators'
import Apium from '../vendor/Apium'

export async function updatePassword(token, oldPassword, password, repeatPassword) {
    validateJWT(token)
    validatePassword(oldPassword, 'previous password')
    validatePassword(password, 'new password')
    validatePassword(repeatPassword, 'new password repeat')

    if (password !== repeatPassword) throw new ConflictError('new password and new password repeat do not match')
    if (oldPassword === password) throw new ConflictError('previous and new password are the same')

    const api = new Apium(process.env.NEXT_PUBLIC_API_URL)

    const { status, payload } = await api.patch(
        'users/auth',
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ oldPassword, password })
        })

    if (status === 204) return

    else if (status === 401) throw new AuthError('wrong credentials')
    
    else if (status >= 400 && status < 500) {
        const data = JSON.parse(payload)

        throw new Error(data.error)

    } else if (status > 500) throw new Error('server error')
}