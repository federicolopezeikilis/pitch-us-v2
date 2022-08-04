const { AuthError, NotFoundError } = require("errors")
const { User } = require("../models")
const { validatePassword } = require("validators")
const { validateObjectId } = require('../validators')
const bcrypt = require('bcryptjs')

module.exports = async (userId, password) => {
    validateObjectId(userId)
    validatePassword(password)

    const result = await User.findById(userId)

    if (result === null) throw new NotFoundError(`user with id ${userId} not found`)

    const match = await bcrypt.compare(password, result.password)

    if (!match) throw new AuthError('wrong credentials')
    debugger

    const usersFollowedByUser = await User.find({ 'followers': userId})

    usersFollowedByUser.forEach(user => {
        const index = user.followers.findIndex(follower => follower.toString() === userId)

        user.followers.splice(index, 1)

        user.save()
    })

    const usersFollowingUser = await User.find({ 'following': userId})

    usersFollowingUser.forEach(user => {
        const index = user.following.findIndex(following => following.toString() === userId)

        user.following.splice(index, 1)

        user.save()
    })

    await User.deleteOne({ _id: userId })
}