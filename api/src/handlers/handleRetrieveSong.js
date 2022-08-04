const { retrieveSong } = require("../logic")
const { handleErrorsAndRespond } = require("./helpers")

module.exports = async (req, res) => {
    
    try {
        let { params: { songName, artistName } } = req

        songName = songName.split('-').join(' ')
        artistName = artistName.split('-').join(' ')

        const song = await retrieveSong(songName, artistName)

        res.status(200).json(song)
    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}