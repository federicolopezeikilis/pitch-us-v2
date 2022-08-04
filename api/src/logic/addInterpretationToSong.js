const { User, Artist, Song, Interpretation } = require('../models')
const { NotFoundError, ConflictError } = require('errors')
const { validateInterpretationContent } = require('validators')
const { validateObjectId } = require('../validators')

module.exports = async (userId, songId, content) => {
    validateObjectId(userId)
    validateObjectId(songId)
    validateInterpretationContent(content, 'interpretation content')

    const userFounded = await User.findById(userId)
    
    if(!userFounded) throw new NotFoundError(`user with id ${userId} not found`)

    const songFounded = await Song.findById(songId)

    if(!songFounded) throw new NotFoundError(`song with id ${songId} not found`)

    const artistFounded = await Artist.findById(songFounded.artist)

    if(!artistFounded) throw new ConflictError(`artists from song with id ${songId} does not exist`)
        
    const interpretation = new Interpretation({ user: userId, song: songId, content })

    await interpretation.save()
    
    return interpretation._id.toString()
}