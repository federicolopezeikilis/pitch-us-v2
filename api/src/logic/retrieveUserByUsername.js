const { validateStringNotEmptyNoSpaces } = require('validators')
const { NotFoundError } = require('errors')
const { User } = require('../models')

module.exports = async username => {
    validateStringNotEmptyNoSpaces(username)

    const user = await User.findOne({ username }).lean()

    if (!user) throw new NotFoundError(`user with username ${username} not found`)

    user.id = user._id.toString()

    delete user._id
    delete user.password
    delete user.__v
    delete user.email

    return user
}