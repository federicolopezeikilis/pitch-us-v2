const { User } = require('../models')
const { AuthError } = require('errors')
const { validatePassword, validateEmail } = require('validators')
const bcrypt = require('bcryptjs')

module.exports = async (email, password) => {
    validateEmail(email)
    validatePassword(password)

    const user = await User.findOne({ email })

    if (!user) throw new AuthError('wrong credentials')

    const match = await bcrypt.compare(password, user.password)

    if(!match) throw new AuthError('wrong credentials')

    return user.id
}