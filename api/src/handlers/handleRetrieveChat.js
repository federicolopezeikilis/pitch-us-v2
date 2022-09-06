const { retrieveChat } = require('../logic')
const { verifyToken, handleErrorsAndRespond } = require('./helpers')

module.exports = async (req, res) => {
    try {
        const userId = verifyToken(req)

        const { params: { userToChatId } } = req

        const chat = await retrieveChat(userId, userToChatId)

        if(!chat) {
            res.status(204).send()
        } else {
            res.status(200).json(chat)
        }
    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}