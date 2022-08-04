const { toggleOrUpdateRankToInterpretation } = require('../logic')
const { verifyToken, handleErrorsAndRespond } = require('./helpers')

module.exports = async (req, res) => {
    try {
        
        const userId = verifyToken(req)

        const { params: { songId, interpretationId }, body: { amount } } = req

        await toggleOrUpdateRankToInterpretation(userId, songId, interpretationId, amount)
        
        res.status(201).send()
    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}