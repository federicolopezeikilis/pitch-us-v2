const { retrieveInterpretationFromSong } = require("../logic")
const { handleErrorsAndRespond } = require("./helpers")


module.exports = async (req, res) => {
    try {
        
        const { params: { interpretationId } } = req

        const interpretation = await retrieveInterpretationFromSong(interpretationId)

        res.status(200).json(interpretation)
    } catch(error) {
        handleErrorsAndRespond(error, res)
    }
}