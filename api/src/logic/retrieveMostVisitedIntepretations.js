const { Interpretation } = require('../models')

module.exports = async () => {
    let interpretations = await Interpretation
        .aggregate([
            {
                $addFields: { visits_count: { $size: { "$ifNull": ["$visits", []] } } }
            },
            {
                $sort: { "visits_count": -1 }
            },
            { $limit: 5 }
        ])

    interpretations = await Interpretation.populate(interpretations, { path: "song", options: { lean: true }, populate: { path: 'artist', options: { lean: true } } })
    interpretations = await Interpretation.populate(interpretations, { path: "user", select: 'username' })

    interpretations.forEach(interpretation => {
        interpretation.id = interpretation._id.toString()
        interpretation.user.id = interpretation.user._id.toString()
        interpretation.song.id = interpretation.song._id.toString()
        interpretation.song.artist.id = interpretation.song.artist._id.toString()

        delete interpretation._id
        delete interpretation.__v
        delete interpretation.content
        delete interpretation.date
        delete interpretation.visits
    })

    interpretations.forEach(interpretation => {
        delete interpretation.song.__v
        delete interpretation.song.artist.__v
        delete interpretation.user._id
        delete interpretation.song._id
        delete interpretation.song.artist._id
    })

    return interpretations
}