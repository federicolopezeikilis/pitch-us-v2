const validateArray = require('./validateArray')
const validateNumber = require('./validateNumber')
const { ConflictError } = require('errors')

module.exports = genres => {
    validateArray(genres, 'genres')

    const hasIncorrectGenre = genres.some(genre => validateNumber(genre) || genre < 0 || genre > 24)

    if(hasIncorrectGenre) throw new ConflictError(`invalid genre`)
}