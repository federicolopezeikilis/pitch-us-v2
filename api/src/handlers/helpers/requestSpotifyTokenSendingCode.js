const Apium = require('../../vendor/Apium')

module.exports = async code => {
    
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
        const spotifyToken = JSON.parse(payload)

        const now = new Date(Date.now())
        
        const expireDate = new Date(new Date(now).setMinutes(now.getMinutes() + spotifyToken.expires_in / 60))

        spotifyToken.expireDate = expireDate

        return spotifyToken
    } else {
        throw new Error(`Error in authentication with Spotify`)
    }

    //TODO CONTINUE HANDLE ERRORS
}