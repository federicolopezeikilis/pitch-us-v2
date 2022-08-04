const { handleErrorsAndRespond, verifyToken, getSpotifySession } = require("./helpers")
const { getTopArtists } = require('../logic')

module.exports = async (req, res) => {
    try {
        
        const userId = verifyToken(req)
        
        const access_token = await getSpotifySession(userId)

        const topArtists = await getTopArtists(userId, access_token)

        res.status(200).json(topArtists)

    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}