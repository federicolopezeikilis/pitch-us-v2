const { AuthError } = require('errors')

module.exports = token => {
    const hasPartsFull = token.split('.').every(part => part.length > 0)

    if (token.split('.').length !== 3 || !hasPartsFull) throw new AuthError('invalid token')

    const otherFormatPart2 = token.split('.')[1]
    
    const jsonPart2 = atob(otherFormatPart2)

    const part2 = JSON.parse(jsonPart2)

    const { exp } = part2

    if(exp < Math.round(Date.now()/1000)) throw new AuthError('token expired')
}