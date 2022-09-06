const { User } = require('../models')
const { NotFoundError } = require('errors')
const { validateObjectId } = require('../validators')

module.exports = async userId => {
    validateObjectId(userId)

    const user = await User.findById(userId).populate([{ path: 'following', select: 'username' }, { path: 'followers', select: 'username' }]).lean()

    if (!user) throw new NotFoundError(`user with id ${userId} not found`)

    let usersFollowedAndFollowers = user.following.filter(following => {
        return user.followers.some(follower => follower._id.toString() === following._id.toString() )
    })

    usersFollowedAndFollowers = usersFollowedAndFollowers.map(user => {
        user.id = user._id.toString()

        delete user._id

        return user
    })

    return usersFollowedAndFollowers
}