const { User } = require('../models')
const { AuthError } = require('errors')
const { validateStringNotEmptyNoSpaces, validateStringNotEmptyOrBlank, validateEmail } = require('validators')
const { user } = require('../models/schemas')

module.exports = async ({ email, providerName, providerId, username, firstName, lastName }) => {
    validateEmail(email)
    validateStringNotEmptyOrBlank(username)
    validateStringNotEmptyNoSpaces(providerName)
    validateStringNotEmptyNoSpaces(providerId)
    if (firstName) validateStringNotEmptyOrBlank(firstName)
    if (lastName) validateStringNotEmptyOrBlank(lastName)

    const userByEmail = await User.findOne({ email })

    if (userByEmail) {
        if (userByEmail.provider.name !== providerName) {
            if (userByEmail.provider.name == undefined && user.email.split('@')[1].includes('gmail') && providerName === 'google')
                return userByEmail._id.toString()

            else throw new AuthError('email already registered with other provider')
        }

        if (userByEmail.provider.providerId !== providerId) throw new AuthError('providerId does not match')

        return userByEmail._id.toString()
    }

    const userByProvider = await User.findOne({ 'provider.name': providerName, 'provider.providerId': providerId })

    if (!userByProvider) {
        let otherUser = await User.findOne({ username })

        let userCreated

        if (!otherUser) {
            userCreated = await User.create({ email, username, provider: { name: providerName, providerId }, firstName, lastName })

        } else {
            let counter = 1

            while (otherUser !== null) {
                otherUser = await User.findOne({ username: `${username}${++counter}` })
            }

            userCreated = await User.create({ email, username: `${username}${counter}`, provider: { name: providerName, providerId } })
        }

        return userCreated._id.toString()
    }

    if (userByProvider.email !== email) throw new AuthError('email does not match with provider information')
}
