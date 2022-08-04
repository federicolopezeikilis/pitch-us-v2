const { toggleFollow } = require("../logic")
const { handleErrorsAndRespond, verifyToken } = require("./helpers")

module.exports = async (req, res) => {
    try {
        const userId = verifyToken(req)

        const { params: { userIdToFollowOrUnfollow } } = req

        await toggleFollow(userId, userIdToFollowOrUnfollow)

        res.status(204).send()

    } catch (error) {
        handleErrorsAndRespond(error, res)
    }

}