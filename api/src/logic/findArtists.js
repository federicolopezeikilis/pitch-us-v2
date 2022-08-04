const { Artist } = require('../models')
const { validateStringNotEmptyOrBlank } = require('validators')

module.exports = async query => {
    validateStringNotEmptyOrBlank(query)
    
    const re = new RegExp(query)

    const artists = await Artist.find({ name: { $regex: re , $options: 'i' }}).lean()

    return artists.map(artist => {
        artist.id = artist._id.toString()
        delete artist._id
        delete artist.__v
        delete artist.country
        delete artist.genres

        return artist
    })
}