const { User } = require('../../models')
const { NotFoundError, AuthError } = require('errors')
const { validateObjectId } = require('../../validators')
const Apium = require('../../vendor/Apium')

module.exports = async userId => {
    
    validateObjectId(userId)

    const user = await User.findById(userId)

    if (!user) throw new NotFoundError(`user with id ${userId} not found`)

    if (!user.spotifySession) throw new NotFoundError(`not spotifySession save for user with id ${userId}`)

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

            const expireDate = new Date(new Date(now).setMinutes(now.getMinutes() + (spotifySession.expires_in / 60) - 1))

            spotifySession.expireDate = expireDate

            user.spotifySession = { ...user.spotifySession, ...spotifySession }
            
            await user.save()
            
            return spotifySession.access_token

        } else {
            user.spotifySession = null

            await user.save()

            throw new AuthError('spotify connection problem')
        } 
    }

    return user.spotifySession.access_token
}