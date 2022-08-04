const validateString = require('./validateString')
const { FormatError } = require('errors')

module.exports = (password, explain = 'password') => {
    validateString(password, explain)

    if (password.length < 8) throw new FormatError(`${explain} length is lower than 8`)

    if (password.search(/[a-z]/) < 0) throw new FormatError(`${explain} has not at least a lower case letter`)
    
    if (password.search(/[A-Z]/) < 0) throw new FormatError(`${explain} has not at least an upper case letter`)

    if (password.search(/[0-9]/) < 0) throw new FormatError(`${explain} has not at least a number`)
}