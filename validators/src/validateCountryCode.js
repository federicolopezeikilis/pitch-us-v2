const countries = require('data')
const { ConflictError } = require('errors')

module.exports = countryCode => {
    const countryCodes = Object.keys(countries)

    if(!countryCodes.includes(countryCode)) throw new ConflictError(`invalid country code ${countryCode}`)
}