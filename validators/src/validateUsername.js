const validateStringNotEmptyNoSpaces = require('./validateStringNotEmptyNoSpaces')
const { FormatError } = require('errors')

module.exports = username => {
    validateStringNotEmptyNoSpaces(username, 'username')

    if (username.length < 4)
        throw new FormatError('username length is lower than 4')
}