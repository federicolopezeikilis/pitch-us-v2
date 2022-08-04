const { Artist } = require('../models')

module.exports = async () => {
    const artists = await Artist
        .aggregate([
            {
                $sort: { "visits": -1 }
            },
            { $limit: 5 }
        ])

    artists.forEach(artist => {
        artist.id = artist._id.toString()
        
        delete artist._id
        delete artist.__v
    })

    return artists
}