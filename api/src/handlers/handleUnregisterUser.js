const { handleErrorsAndRespond, verifyToken } = require("./helpers")
const { unregisterUser } = require('../logic')

module.exports = async (req, res) => {
    try {
        const userId = verifyToken(req)
        const { body: { password } } = req

        await unregisterUser(userId, password)
            
        res.status(204).send()
        
    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}