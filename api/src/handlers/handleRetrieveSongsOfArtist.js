const { retrieveSongsOfArtist } = require('../logic')
const { handleErrorsAndRespond } = require('./helpers')

module.exports = async (req, res) => {
    try {
        let { params: { artistName } } = req

        artistName = artistName.split('-').join(' ')
        
        const songsOfArtist = await retrieveSongsOfArtist(artistName)
        
        res.status(200).json(songsOfArtist)
        
    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}