const { authenticateOrRegisterUser } = require('../logic')
const { generateToken, handleErrorsAndRespond } = require('./helpers')

module.exports = async (req, res) => {
    try {
        debugger
        const { body: { email, providerName, providerId, username, firstName, lastName } } = req

        const userId = await authenticateOrRegisterUser({ email, providerName, providerId, username, firstName, lastName })

        const token = generateToken(userId)

        res.status(200).json({ token })

    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}