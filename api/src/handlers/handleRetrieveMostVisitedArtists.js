const { retrieveMostVisitedArtists } = require("../logic")
const { handleErrorsAndRespond } = require("./helpers")

module.exports = async (req, res) => {
    try {
        const artists = await retrieveMostVisitedArtists()

        res.status(200).json(artists)
    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}