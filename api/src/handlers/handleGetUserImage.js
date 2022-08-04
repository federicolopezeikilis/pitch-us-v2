const { getUserImage } = require('../logic')
const { verifyToken, handleErrorsAndRespond } = require('./helpers')

module.exports = async (req, res) => {
    try {
        const { params: { userId } } = req

        await getUserImage(userId, res)
        
        res.status(200).send()

    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}