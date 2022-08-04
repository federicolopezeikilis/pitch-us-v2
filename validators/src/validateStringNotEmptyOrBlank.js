const { FormatError } = require('errors')
const validateString = require('./validateString')

module.exports = (string, explain = 'string') => {
    validateString(string, explain)

    if (!string.length) throw new FormatError(`${explain} is empty`)

    if (!string.trim().length) throw new FormatError(`${explain} is blank`)
}
