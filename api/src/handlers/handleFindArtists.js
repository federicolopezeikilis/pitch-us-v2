const { findArtists } = require('../logic')
const { handleErrorsAndRespond } = require('./helpers')

module.exports = async (req, res) => {
    try {
        const { query: { q: query } } = req

        const artistsResults = await findArtists(query)
        
        res.status(200).json(artistsResults)
        
    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}