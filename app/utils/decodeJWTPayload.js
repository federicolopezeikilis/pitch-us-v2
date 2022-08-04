export function decodeJWTPayload(token) {
    const part = atob(token.split('.')[1])

    const userId = JSON.parse(part).sub

    return userId
}