const { FormatError } = require('errors')
const validateNumber = require('./validateNumber')

module.exports = rank => {
    validateNumber(rank, 'rank')
    let isAnIntegerFrom1To5 = false

    for (let i = 1; i < 6; i++){
        if(rank === i) isAnIntegerFrom1To5 = true
    }

    if(!isAnIntegerFrom1To5) throw new FormatError(`rank ${rank} is not an integer from 1 to 5`)
}