const { validateObjectId } = require('../validators')
const { NotFoundError } = require('errors')
const { User, Artist } = require('../models')
const Apium = require('../vendor/Apium')

module.exports = async (userId, access_token) => {
    
    validateObjectId(userId)
    // TODO VALIDATE ACCESS_TOKEN

    const result = await User.findById(userId)

    if (result === null) throw new NotFoundError(`user with id ${userId} not found`)

    const api = new Apium(process.env.SPOTIFY_API_URL)

    const { status, payload } = await api.get(
        'me/top/artists',
        {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }
    )

    if (status === 200) {
        const data = JSON.parse(payload)

        let topArtistsFromSpotify = data.items.map(item => item.name)

        topArtistsFromSpotify = topArtistsFromSpotify.map(artist => {
            artist = artist.toLowerCase()

            for (let i = 0; i < artist.length; i++) {
                if (artist[i] === 'á') artist[i] = 'a'
                else if (artist[i] === 'é') artist[i] = 'e'
                else if (artist[i] === 'í') artist[i] = 'i'
                else if (artist[i] === 'ó') artist[i] = 'o'
                else if (artist[i] === 'ú') artist[i] = 'u'
            }

            return artist
        })

        if(topArtistsFromSpotify.length > 0) {
            const topArtistsFromSpotifyReducedString = topArtistsFromSpotify.reduce((previousValue, currentValue) => {
                return previousValue + '|' + currentValue
            })
    
            const topArtistsFromSpotifyRegex = new RegExp(topArtistsFromSpotifyReducedString)
    
            let topArtists = await Artist.find({ name: { $regex:  topArtistsFromSpotifyRegex, $options: 'i' } }).lean()
    
            topArtists = topArtists.map(artist => {
                artist.id = artist._id.toString()
                delete artist._id
                delete artist.__v
                delete artist.country
                delete artist.genres
    
                return artist
            })
    
            return topArtists
        } else {
            return []
        }
    } else {
        console.log(payload)
     
        throw new Error(`Error in top artists with Spotify`)
        //TODO CONTINUE HANDLE ERRORS
    }
}


