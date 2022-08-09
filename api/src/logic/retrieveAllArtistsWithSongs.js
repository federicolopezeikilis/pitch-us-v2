const { Song } = require('../models')

module.exports = async () => {
    // const songs = await Song.find({}, {name: 1, artist: 1, _id: 0}).populate({path: 'artist', select: 'name -_id'})

    let artists = await Song.aggregate([
        { $match: {} },
        {
            $project: {
                'artist': 1,
                'name': 1,
                '_id': 0
            }
        },
        {
            $lookup: {
                from: 'artists',
                localField: 'artist',
                foreignField: '_id',
                as: 'artist',
                pipeline: [{ $project: { 'name': 1, '_id': 0 } }]
            }
        },
        {
            $group: {
                _id: '$artist',
                songs: { $push: '$name'}
            }
        }
    ])

    artists = artists.map(artist => {
        return {name: artist._id[0].name, songs: artist.songs}
    })

    return artists
}