const { User, Artist, Song, Rank, Interpretation } = require('../models')
const { NotFoundError, ConflictError } = require('errors')
const { validateRank } = require('validators')
const { validateObjectId } = require('../validators')

module.exports = async (userId, songId, interpretationId, amount) => {
    validateObjectId(userId)
    validateObjectId(songId)
    validateObjectId(interpretationId)
    validateRank(amount)

    const userFounded = await User.findById(userId)

    if (!userFounded) throw new NotFoundError(`user with id ${userId} not found`)

    const songFounded = await Song.findById(songId)

    if (!songFounded) throw new NotFoundError(`song with id ${songId} not found`)

    const artistFounded = await Artist.findById(songFounded.artist)

    if (!artistFounded) throw new ConflictError(`artists from song with id ${songId} does not exist`)

    const interpretation = await Interpretation.findById(interpretationId)

    if (!interpretation) throw new NotFoundError(`interpretation with id ${interpretationId} not found`)

    if (interpretation.user.toString() === userId) throw new ConflictError(`user with id ${userId} is not allowed to rank his own interpretation with id ${interpretationId}`)

    const indexOfRank = interpretation.ranks.findIndex(rank => rank.user.toString() === userId)

    if (indexOfRank !== -1) {
        if (interpretation.ranks[indexOfRank].amount === amount) {
            interpretation.ranks.splice(indexOfRank, 1)

            await songFounded.save()

            return
        }

        interpretation.ranks.splice(indexOfRank, 1)
    }

    const rank = new Rank({ user: userId, amount: amount })

    interpretation.ranks.push(rank)

    await interpretation.save()
}