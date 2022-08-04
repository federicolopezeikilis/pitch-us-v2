const { NotFoundError, ConflictError } = require("errors")
const { User } = require("../models")
const { validateObjectId } = require("../validators")

module.exports = async (userId, userIdToFollowOrUnfollow) => {
    validateObjectId(userId)
    validateObjectId(userIdToFollowOrUnfollow)

    if(userId === userIdToFollowOrUnfollow) throw new ConflictError('user cannot follow themself')

    const user = await User.findById(userId)

    if (!user) throw new NotFoundError(`user with id ${userId} not found`)

    const userToFollowOrUnfollow = await User.findById(userIdToFollowOrUnfollow)

    if (!userToFollowOrUnfollow) throw new NotFoundError(`user to follow with id ${userIdToFollowOrUnfollow} not found`)

    let indexFollowing

    indexFollowing = user.following.findIndex(following => following.toString() === userIdToFollowOrUnfollow)

    if (indexFollowing === -1) {
        user.following.push(userIdToFollowOrUnfollow)
        userToFollowOrUnfollow.followers.push(userId)

    } else {
        user.following.splice(indexFollowing, 1)

        const indexFollowers = userToFollowOrUnfollow.followers.findIndex(follower => follower.toString() === userId)

        userToFollowOrUnfollow.followers.splice(indexFollowers, 1)
    }

    await user.save()
    await userToFollowOrUnfollow.save()
}