const { retrieveMostVisitedInterpretations } = require("../logic")
const { handleErrorsAndRespond } = require("./helpers")

module.exports = async (req, res) => {
    try {
        const interpretations = await retrieveMostVisitedInterpretations()

        res.status(200).json(interpretations)
    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}