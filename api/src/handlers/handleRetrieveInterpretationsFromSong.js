const { retrieveInterpretationsFromSong } = require("../logic")
const { handleErrorsAndRespond } = require("./helpers")


module.exports = async (req, res) => {
    try {
        let { params: { songName, artistName } } = req

        songName = songName.split('-').join(' ')
        artistName = artistName.split('-').join(' ')

        const interpretations = await retrieveInterpretationsFromSong(songName, artistName)

        res.status(200).json(interpretations)
    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}