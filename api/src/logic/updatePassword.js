const { User } = require('../models')
const { NotFoundError, AuthError } = require('errors')
const { validatePassword} = require('validators')
const { validateObjectId } = require('../validators')
const bcrypt = require('bcryptjs')

module.exports = async (userId, oldPassword, password) => {
    validateObjectId(userId)
    validatePassword(oldPassword, 'previous password')
    validatePassword(password, 'new password')

    if (oldPassword === password) throw new ConflictError('previous and new password are the same')

    const user = await User.findById(userId)

    if(!user) throw new NotFoundError(`user with id ${userId} not found`)

    const match = await bcrypt.compare(oldPassword, user.password)
    
    if(!match) throw new AuthError('wrong credentials')

    const hash = await bcrypt.hash(password, 10)

    const result = await User.updateOne({ _id: userId }, { $set: { password: hash } })

    if (result.matchedCount === 0) throw new NotFoundError(`user with id ${userId} not found`)
}