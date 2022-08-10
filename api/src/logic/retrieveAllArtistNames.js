const { Artist } = require('../models')

module.exports = async () => {
    let artists = await Artist.find({}, {name: 1, _id: 0})

    artists = artists.map(artist => artist.name)
    
    return artists
}