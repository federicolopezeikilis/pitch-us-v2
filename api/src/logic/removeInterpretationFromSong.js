const { AuthError, NotFoundError } = require("errors")
const { User, Artist, Song, Interpretation } = require("../models")
const { validatePassword } = require("validators")
const { validateObjectId } = require('../validators')

module.exports = async (userId, password, songId, interpretationId) => {
    validateObjectId(userId)
    validatePassword(password)
    validateObjectId(interpretationId)
    
    const userFounded = await User.findById(userId)

    if (userFounded === null) throw new NotFoundError(`user with id ${userId} not found`)

    if (userFounded.password !== password) throw new AuthError('wrong credentials')

    const songFounded = await Song.findById(songId)

    if (!songFounded) throw new NotFoundError(`song with id ${songId} not found`)

    const interpretation = await Interpretation.findById(interpretationId)
    
    if(!interpretation) throw new NotFoundError(`interpretation with id ${interpretationId} not found`)

    await Interpretation.deleteOne({ _id: interpretationId})
}