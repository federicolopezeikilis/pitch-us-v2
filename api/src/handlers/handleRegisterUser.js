const { registerUser } = require('../logic')
const { handleErrorsAndRespond } = require('./helpers')

module.exports = async (req, res) => {
    try {
        const { body: { username, email, password } } = req

        await registerUser(username, email, password)
        
        res.status(201).send()

    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}