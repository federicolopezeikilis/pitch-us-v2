const { updateUserImage } = require('../logic')
const { verifyToken, handleErrorsAndRespond } = require('./helpers')

module.exports = async (req, res) => {
    try {
        const userId = verifyToken(req)

        const contentType = req.header('content-type')

        await updateUserImage(userId, contentType, req)

        res.status(204).send()
        
    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}