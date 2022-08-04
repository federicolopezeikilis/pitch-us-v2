const validateString= require('./validateString')
const { FormatError } = require('errors')

module.exports = (email, explain = 'email') => {
    validateString(email, explain)

    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

    if (!regex.test(email)) throw new FormatError(`${explain} is not an email`)
}