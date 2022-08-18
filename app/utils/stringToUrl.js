import { validateStringNotEmptyOrBlank } from "validators"

export function stringToUrl(string, caseSensitive) {
    validateStringNotEmptyOrBlank(string, 'string to url')

    if(caseSensitive) 
        return string.replaceAll(' ', '-')
    else
        return string.replaceAll(' ', '-').toLowerCase()
}