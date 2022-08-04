const { authenticateUser } = require('../logic')
const { generateToken, handleErrorsAndRespond } = require('./helpers')

module.exports = async (req, res) => {
    try {
        const { body: { email, password } } = req

        const userId = await authenticateUser(email, password)
        
        const token = generateToken(userId)

        res.status(200).json({ token })
    
        } catch (error) {
            handleErrorsAndRespond(error, res)
        }
}