const { handleErrorsAndRespond, verifyToken } = require("./helpers")
const { requestSpotifyAccessToken } = require('../logic')

module.exports = async (req, res) => {
    try {
        const userId = verifyToken(req)
        const { body: { code, state } } = req

        const access_token = await requestSpotifyAccessToken(userId, code, state)

        res.status(200).json({ access_token })

    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}