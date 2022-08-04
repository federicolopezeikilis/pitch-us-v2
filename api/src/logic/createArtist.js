const { Artist, User } = require('../models')
const { ConflictError, NotFoundError } = require('errors')
const { 
    validateStringNotEmptyOrBlank,
    validateCountryCode,
    validateGenres,
} = require('validators')
const { validateObjectId } = require('../validators')


module.exports = async (userId, name, genres, country) => {
    validateObjectId(userId)
    validateStringNotEmptyOrBlank(name, 'artist name')
    if (genres) validateGenres(genres)
    if (country) validateCountryCode(country)
    
    try {
        const user = await User.findById(userId)

        if(!user) throw new NotFoundError(`user with id ${userId} not found`)
        
        const { _id } = await Artist.create({ name, genres, country })

        return { id: _id.toString() }

    } catch(error) {
        if (error.message.includes('duplicate key error'))
            throw new ConflictError(`artist ${name} already exists`)    
            
        throw error
    }
}