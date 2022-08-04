const { validateObjectId } = require('../validators')
const { User, Interpretation } = require('../models')
const { NotFoundError } = require('errors')

module.exports = async userId => {
    validateObjectId(userId)

    const user = await User.findById(userId)

    if (!user) throw new NotFoundError(`user with id ${userId} not found`)

    const followingUsers = user.following

    if (followingUsers.length === 0) return []

    const interpretations = await Interpretation.find({ user: { $in: followingUsers } }).populate({ path: 'song', populate: { path: 'artist' } }).lean()
        .sort({ date: -1 })
        .limit(5)
        .populate({ path: 'song', populate: { path: 'artist' } })
        .populate({ path: 'user', select: 'username' })
        .lean()

    interpretations.forEach(interpretation => {
        interpretation.id = interpretation._id.toString()
        interpretation.user.id = interpretation.user._id.toString()
        interpretation.song.id = interpretation.song._id.toString()
        interpretation.song.artist.id = interpretation.song.artist._id.toString()

        delete interpretation._id
        delete interpretation.__v
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