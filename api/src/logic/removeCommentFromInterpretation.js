const { User, Song, Artist, Interpretation } = require('../models')
const { NotFoundError, ConflictError } = require('errors')
const { validateObjectId } = require('../validators')

module.exports = async (userId, songId, interpretationId, commentId) => {
    validateObjectId(userId)
    validateObjectId(songId)
    validateObjectId(interpretationId)
    validateObjectId(commentId)

    const userFounded = await User.findById(userId)

    if (!userFounded) throw new NotFoundError(`user with id ${userId} not found`)

    const songFounded = await Song.findById(songId)

    if (!songFounded) throw new NotFoundError(`song with id ${songId} not found`)

    const artistFounded = await Artist.findById(songFounded.artist)

    if (!artistFounded) throw new ConflictError(`artists from song with id ${songId} does not exist`)

    const interpretation = await Interpretation.findById(interpretationId)

    if(!interpretation) throw new NotFoundError(`interpretation with id ${interpretationId} not found`)

    const commentIndex = interpretation.comments.findIndex(comment => comment._id.toString() === commentId)

    if(commentIndex === -1) throw new NotFoundError(`comment with id ${commentId} not found`)

    if(interpretation.comments[commentIndex].user.toString() !== userId) throw new ConflictError(`comment with id ${commentId} does not belong to user with id ${userId}`)
    
    interpretation.comments.splice(commentIndex, 1)

    await interpretation.save()
}