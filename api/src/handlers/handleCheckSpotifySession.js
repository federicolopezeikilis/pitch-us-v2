const { checkSpotifySession } = require('../logic')
const { handleErrorsAndRespond, verifyToken } = require('./helpers')

module.exports = async (req, res) => {
    
    try {
        const userId = verifyToken(req)

        const { query: { code } } = req

        const isSessionActive = await checkSpotifySession(userId, code)
        
        res.status(200).json({ isSessionActive })
        
    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}