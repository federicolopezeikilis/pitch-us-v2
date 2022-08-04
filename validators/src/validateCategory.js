const validateStringNotEmptyNoSpaces = require("./validateStringNotEmptyNoSpaces")

module.exports = category => {
    validateStringNotEmptyNoSpaces(category, 'category')

    if (category !== 'all' && category !== 'artists' && category !== 'songs' && category !== 'users')
        throw new FormatError(`invalid category '${category}'`)
}
