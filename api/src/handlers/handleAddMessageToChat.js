const { addMessageToChat } = require('../logic')
const { verifyToken, handleErrorsAndRespond } = require('./helpers')

module.exports = async (req, res) => {
    try {
        const userId = verifyToken(req)

        const { body: { to, text } } = req

        await addMessageToChat(userId, to, text)

        res.status(204).send()
    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}