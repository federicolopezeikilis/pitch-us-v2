const { retrieveLastInterpretationsOfFollowed } = require("../logic")
const { handleErrorsAndRespond, verifyToken } = require("./helpers")

module.exports = async (req, res) => {
    try {
        const userId = verifyToken(req)

        const interpretations = await retrieveLastInterpretationsOfFollowed(userId)

        res.status(200).json(interpretations)
    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}