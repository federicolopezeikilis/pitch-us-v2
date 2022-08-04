const { findArtistsSongsAndUsers } = require('../logic')
const { handleErrorsAndRespond } = require('./helpers')

module.exports = async (req, res) => {
    try {
        
        const { query: { q: query, category } } = req

        const results = await findArtistsSongsAndUsers(query, category)
        
        res.status(200).json(results)
        
    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}