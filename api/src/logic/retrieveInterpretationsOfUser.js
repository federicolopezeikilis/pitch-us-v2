const { NotFoundError } = require('errors')
const { User, Interpretation } = require('../models')
const { validateObjectId } = require('../validators')

module.exports = async (userId) => {
    validateObjectId(userId)

    const user = await User.findById(userId)

    if (!user) throw new NotFoundError(`user with id ${userId} not found`)

    const interpretations = await Interpretation.find({ user: userId }).populate({ path: 'song', populate: { path: 'artist' } }).lean()

    interpretations.forEach(interpretation => {
        interpretation.id = interpretation._id.toString()
        interpretation.user = interpretation.user.toString()
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
        delete interpretation.song._id
        delete interpretation.song.artist._id
    })

    return interpretations
}