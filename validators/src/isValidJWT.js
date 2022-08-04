const validateJWT = require('./validateJWT')

module.exports = token => {
    try {
        validateJWT(token)

        return true
    } catch(error) {
        return false
    }
}