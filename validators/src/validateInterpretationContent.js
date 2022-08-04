const { FormatError } = require("errors")
const validateStringNotEmptyOrBlank = require("./validateStringNotEmptyOrBlank")

module.exports = content => {
    validateStringNotEmptyOrBlank(content, 'interpretation content')
    
    if(content.length < 200) throw new FormatError('interpretation content has less than 200 characters')
}