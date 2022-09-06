const { Chat } = require("../models")
const { validateObjectId } = require('../validators')

module.exports = async (user1, user2) => {
    validateObjectId(user1)
    validateObjectId(user2)

    const chat = await Chat.findOne({ users: { $all: [user1, user2] } }).populate({ path: 'messages.user', select: 'username' }).lean()

    if(chat) {
        chat.id = chat._id.toString()
        
        delete chat.__v
        delete chat._id
    }

    return chat
}