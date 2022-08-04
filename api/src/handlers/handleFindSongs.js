const { retrieveSongs } = require('../logic')
const { handleErrorsAndRespond } = require('./helpers')

module.exports = async (req, res) => {
    try {
        const { query: { q: query } } = req
        
        const songsResults = await retrieveSongs(query)
        
        res.status(200).json(songsResults)
        
    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}