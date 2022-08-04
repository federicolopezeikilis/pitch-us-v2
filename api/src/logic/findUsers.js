const { User } = require('../models')
const { validateStringNotEmptyOrBlank } = require('validators')

module.exports = async query => {
    validateStringNotEmptyOrBlank(query)

    const re = new RegExp(query)

    const users = await User.find({ username: { $regex: re , $options: 'i' }}).lean()

    return users.map(user => {
        user.id = user._id.toString()

        delete user._id
        delete user.__v
        
        return user
    })
}