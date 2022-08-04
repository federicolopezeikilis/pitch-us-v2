const { retrieveUserByUsername } = require('../logic')
const { handleErrorsAndRespond } = require('./helpers')

module.exports = async (req, res) => {
    try {
        const { params: { username } } = req

        const user = await retrieveUserByUsername(username)

        res.status(200).json(user)

    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}