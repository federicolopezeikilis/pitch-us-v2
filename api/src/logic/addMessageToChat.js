const { validateStringNotEmptyOrBlank } = require("validators")
const { User, Chat } = require("../models")
const { validateObjectId } = require("../validators")
const { NotFoundError, ConflictError } = require('errors')

module.exports = async (from, to, text) => {
    validateObjectId(from, 'user from')
    validateObjectId(to, 'user to')
    validateStringNotEmptyOrBlank(text)

    const [userFrom, userTo] = await Promise.all([User.findById(from), User.findById(to)])

    if (!userFrom) throw new NotFoundError(`user who sends the message with id ${from} not found`)

    if (!userTo) throw new NotFoundError(`user who receives the message with id ${to} not found`)

    const userFromFollowsUserTo = userFrom.following.some(user => user.toString() === to)

    if (!userFromFollowsUserTo) throw new ConflictError(`user with id ${from} does not follow user with id ${to}`)

    const userFromIsFollowedByUserTo = userFrom.followers.some(user => user.toString() === to)

    if (!userFromIsFollowedByUserTo) throw new ConflictError(`user with id ${from} is not followed by user with id ${to}`)

    const previousChat = await Chat.findOne({ users: { $all: [from, to] } })

    if (!previousChat) {
        await Chat.create({ users: [from, to], messages: [{ user: from, text }] })

        return
    }

    previousChat.messages.push({ user: from, text })

    await previousChat.save()
}