const { User } = require('../models')

module.exports = async () => {
    let users = await User.find({}, {username: 1, _id: 0})

    users = users.map(user => user.username)

    return users
}