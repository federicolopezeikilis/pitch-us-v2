const { User, Artist, Song, Comment, Interpretation } = require('../models')
const { NotFoundError, ConflictError } = require('errors')
const { validateStringNotEmptyOrBlank, validateObject } = require('validators')
const { validateObjectId } = require('../validators')

module.exports = async (userId, songId, interpretationId, text) => {
    validateObjectId(userId)
    validateObjectId(songId)
    validateObjectId(interpretationId)
    validateStringNotEmptyOrBlank(text, 'comment') 

    const userFounded = await User.findById(userId)

    if (!userFounded) throw new NotFoundError(`user with id ${userId} not found`)

    const songFounded = await Song.findById(songId)

    if (!songFounded) throw new NotFoundError(`song with id ${songId} not found`)

    const artistFounded = await Artist.findById(songFounded.artist)

    if (!artistFounded) throw new ConflictError(`artists from song with id ${songId} does not exist`)

    const interpretation = await Interpretation.findById(interpretationId)

    if(!interpretation) throw new NotFoundError(`interpretation with id ${interpretationId} not found`)

    const comment = new Comment({ user: userId, text})

    interpretation.comments.push(comment)

    await interpretation.save()

    return comment._id.toString()
}