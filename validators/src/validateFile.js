const { FormatError } = require('errors')

module.exports = file => {
    if (!(file instanceof File)) throw new FormatError(`file is not a file`)
}