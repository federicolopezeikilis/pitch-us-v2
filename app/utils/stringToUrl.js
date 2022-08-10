import { validateStringNotEmptyOrBlank } from "validators"

export function stringToUrl(string) {
    validateStringNotEmptyOrBlank(string, 'string to url')

    return string.replaceAll(' ', '-').toLowerCase()
}