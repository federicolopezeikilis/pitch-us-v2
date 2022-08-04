const { User } = require('../models')
const { NotFoundError } = require("errors")
const { requestSpotifyTokenSendingCode } = require("../handlers/helpers")
const { validateObjectId } = require("../validators")
const Apium = require('../vendor/Apium')

module.exports = async (userId, code) => {
    validateObjectId(userId)

    const user = await User.findById(userId)

    if (!user) throw new NotFoundError(`user with id ${userId} not found`)

    if (code) {
        try {
            const spotifyToken = await requestSpotifyTokenSendingCode(code)

            user.spotifySession = spotifyToken
            await user.save()

            return true

        } catch (error) {
            return false
        }
    }

    if (user.spotifySession) {
        const expireDate = new Date(user.spotifySession.expireDate)

        if (Date.now() > expireDate) {
            const api = new Apium(process.env.SPOTIFY_ACCOUNTS_API_URL)

            const { status, payload } = await api.post(
                'token',
                {
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        Authorization: `Basic ${(new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))}`
                    },
                    body: `grant_type=refresh_token&refresh_token=${user.spotifySession.refresh_token}`
                })

            if (status === 200) {
                const spotifySession = JSON.parse(payload)

            const now = new Date(Date.now())

            const expireDate = new Date(new Date(now).setMinutes(now.getMinutes() + spotifySession.expires_in / 60) - 1)

            spotifySession.expireDate = expireDate

            user.spotifySession = { ...user.spotifySession, ...spotifySession }
          
            await user.save()

                return true

            } else {
                user.spotifySession = null

                await user.save()

                return false
            }
        }

        return true
    }
    return false
}
