const { retrieveInterpretationsOfUser } = require("../logic")
const { handleErrorsAndRespond } = require("./helpers")

module.exports = async (req, res) => {
    try {
        
        let { params: { userId } } = req

        const interpretations = await retrieveInterpretationsOfUser(userId)

        res.status(200).json(interpretations)
    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}