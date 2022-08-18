const { retrieveInterpretationsFromSong } = require("../logic")
const { handleErrorsAndRespond } = require("./helpers")
const { urlToString } = require('utils')


module.exports = async (req, res) => {
    try {
        let { params: { songName, artistName } } = req

        songName = urlToString(songName)
        artistName = urlToString(artistName)

        const interpretations = await retrieveInterpretationsFromSong(songName, artistName)

        res.status(200).json(interpretations)
    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}