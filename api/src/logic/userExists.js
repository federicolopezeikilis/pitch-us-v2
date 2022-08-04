const { NotFoundError } = require("errors")
const { User } = require("../models")
const { validateObjectId } = require("../validators")

module.exports = async userId => {
    validateObjectId(userId)

    const userExists = User.findById(userId)

    if(!userExists) throw new NotFoundError(`user with id ${userId} not found`)
}