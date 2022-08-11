const { retrieveAllUsernames } = require("../logic")
const { handleErrorsAndRespond } = require("./helpers")

module.exports = async (req, res) => {
    try {
        const users = await retrieveAllUsernames()

        res.status(200).json(users)
    } catch(error) {
        handleErrorsAndRespond(error, res)
    }
}