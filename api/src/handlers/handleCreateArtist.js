const { createArtist } = require('../logic')
const { verifyToken, handleErrorsAndRespond } = require('./helpers')

module.exports = async (req, res) => {
    try {
        const userId = verifyToken(req)

        const { body: { name, genres, country }} = req

        const artist = await createArtist(userId, name, genres, country)
        
        res.status(201).json(artist)
        
    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}