const { isValidObjectId } = require('mongoose')

function validateObjectId(id, explain = 'id') {
    if (!isValidObjectId(id)) throw new TypeError(`${explain} wrong`)
}

module.exports = { validateObjectId }