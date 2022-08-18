import { validatePassword, validateEmail } from 'validators'
import Apium from '../vendor/Apium'

export async function authenticateUser(email, password) {
    validateEmail(email)
    validatePassword(password)

    debugger

    const api = new Apium(process.env.NEXT_PUBLIC_API_URL)

    const { status, payload } = await api.post(
        'users/auth',
        {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

    const data = JSON.parse(payload)

    if (status === 200) return data.token

    else if (status >= 400 && status < 500) throw new Error(data.error)

    else if (status >= 500) throw new Error('server error')
}
