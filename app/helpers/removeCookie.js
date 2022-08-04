import Cookies from 'cookies'

export function removeCookie(req, res, key) {
    const cookies = new Cookies(req, res)

    cookies.set(key)
}