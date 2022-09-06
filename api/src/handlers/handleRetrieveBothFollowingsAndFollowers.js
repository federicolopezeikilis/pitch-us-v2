const { retrieveBothFollowingsAndFollowers } = require('../logic')
const { verifyToken, handleErrorsAndRespond } = require('./helpers')

module.exports = async (req, res) => {
    try {
        const userId = verifyToken(req)

        const user = await retrieveBothFollowingsAndFollowers(userId)
        
        res.status(200).json(user)
        
    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}