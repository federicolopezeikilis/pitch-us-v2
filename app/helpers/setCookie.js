export function setCookie(key, value, maxAge) {
    const cookie = `${key}=${value};`

    if (maxAge)
    cookie += ` max-age=${maxAge};`

    document.cookie = cookie
}