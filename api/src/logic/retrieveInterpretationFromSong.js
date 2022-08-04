const { Interpretation } = require("../models")
const { validateObjectId } = require('../validators')
const { NotFoundError } = require('errors')

module.exports = async interpretationId => {
    validateObjectId(interpretationId)

    const interpretationFound = await Interpretation.findById(interpretationId)
    .populate({ path: 'song', populate: { path: 'artist' } })
    .populate({ path: 'user', select: 'username' })

    if (!interpretationFound) throw new NotFoundError(`interpretation with id ${interpretationId} not found`)

    interpretationFound.visits.push(Date.now())  
    await interpretationFound.save()

    interpretationToReturn = interpretationFound._doc
    
    interpretationToReturn.id = interpretationToReturn._id.toString()
    interpretationToReturn.user.id = interpretationToReturn.user._id.toString()
    interpretationToReturn.song.id = interpretationToReturn.song._id.toString()
    interpretationToReturn.song.artist.id = interpretationToReturn.song.artist._id.toString()

    delete interpretationToReturn._id
    delete interpretationToReturn.__v
    delete interpretationToReturn.visits
    delete interpretationToReturn.user._id
    delete interpretationToReturn.song._id
    delete interpretationToReturn.song.__v
    delete interpretationToReturn.song.artist.__v
    delete interpretationToReturn.song.artist._id

    return interpretationToReturn
}