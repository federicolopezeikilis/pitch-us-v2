const { validateObjectId } = require('../validators')
const { NotFoundError } = require('errors')
const { User } = require('../models')
const Apium = require('../vendor/Apium')

module.exports = async (userId, code, state) => {
    validateObjectId(userId)
    // TODO VALIDATE CODE
    // TODO VALIDATE STATE

    const result = await User.findById(userId)

    if (result === null) throw new NotFoundError(`user with id ${userId} not found`)

    const api = new Apium(process.env.SPOTIFY_ACCOUNTS_API_URL)

    const { status, payload } = await api.post(
        'token',
        {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${(new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))}`
            },
            body: `grant_type=authorization_code&code=${code}&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}`
        })

    if (status === 200) {
        const data = JSON.parse(payload)

        return data.access_token
    } else {
        throw new Error(`Error in authentication with Spotify`)
    }

    //TODO CONTINUE HANDLE ERRORS
}