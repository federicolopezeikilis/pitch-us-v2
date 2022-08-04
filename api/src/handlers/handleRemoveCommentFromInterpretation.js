const { removeCommentFromInterpretation } = require('../logic')
const { verifyToken, handleErrorsAndRespond } = require('./helpers')

module.exports = async (req, res) => {
    try {
        const userId = verifyToken(req)

        const { params: { songId, interpretationId, commentId } } = req

        await removeCommentFromInterpretation(userId, songId, interpretationId, commentId)

        res.status(204).send()
    } catch (error) {
        handleErrorsAndRespond(error, response)
    }
}