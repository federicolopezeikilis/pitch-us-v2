const { addInterpretationToSong } = require('../logic')
const { verifyToken, handleErrorsAndRespond } = require('./helpers')

module.exports = async (req, res) => {
    try {
        const userId = verifyToken(req)

        const { body: { content }, params: { songId } } = req

        const interpretationId = await addInterpretationToSong(userId, songId, content)

        res.status(201).json({ interpretationId })
    } catch (error) {
        handleErrorsAndRespond(error, response)
    }
}