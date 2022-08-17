const { retrieveUserByUsername } = require('../logic')
const { handleErrorsAndRespond } = require('./helpers')
const { urlToString } = require('utils')

module.exports = async (req, res) => {
    try {
        let { params: { username } } = req

        username = urlToString(username)

        const user = await retrieveUserByUsername(username)

        res.status(200).json(user)

    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}