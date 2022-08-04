import { validateStringNotEmptyOrBlank } from 'validators'
import Apium from '../vendor/Apium'

export const findArtistsSongsAndUsers = (() => {
    let _query, _category, _results

    return async function(query, category) {
        
        validateStringNotEmptyOrBlank(query)
        validateStringNotEmptyOrBlank(category)

        if (query !== _query || (_category !== 'all' && category !== _category)) {
            _query = query
            _category = category

            const api = new Apium(process.env.NEXT_PUBLIC_API_URL)

            const { status, payload } = await api.get(
                `search?q=${query}&category=${category}`)

            const data = JSON.parse(payload)

            if (status === 200) {
                _results = data
            }

            else if (status >= 400 && status < 500) throw new Error(data.error)

            else if (status >= 500) throw new Error('server error')
        }

        return _results
    }
})()