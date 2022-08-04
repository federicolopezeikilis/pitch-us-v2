const { ConflictError } = require('errors')
const validateDate = require('./validateDate')

module.exports = dateOfBirth => {
    validateDate(dateOfBirth, 'date of birth')

    if(dateOfBirth < new Date('1900-01-01') || dateOfBirth > Date.now()) throw new ConflictError(`invalid date of birth ${dateOfBirth}`)
}