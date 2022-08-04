const { updatePassword } = require('../logic')
const { verifyToken, handleErrorsAndRespond } = require('./helpers')

module.exports = async (req, res) => {
    try {
        const userId = verifyToken(req)

        const { body: { oldPassword, password } } = req

        await updatePassword(userId, oldPassword, password)
        
        res.status(204).send()
    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}