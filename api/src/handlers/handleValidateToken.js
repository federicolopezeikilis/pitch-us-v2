const { verifyToken, handleErrorsAndRespond } = require('./helpers')
const { userExists } = require('../logic')

module.exports = async (req, res) => {
    try {
        const userId = await verifyToken(req)

        await userExists(userId)

        res.status(200).send()
    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}