require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const admin = require("firebase-admin")
const serviceAccount = require("./config/firebase-key.json")
const { connect, disconnect } = require('mongoose')
const {
    /* USERS */
    handleRegisterUser,
    handleAuthenticateUser,
    handleUpdatePassword,
    handleRetrieveUser,
    handleRetrieveUserByUsername,
    handleRetrieveInterpretationsOfUser,
    handleUpdateUser,
    handleUpdateUserImage,
    handleGetUserImage,
    handleToggleFollow,
    handleUnregisterUser,

    /* TOKEN */
    handleValidateToken,

    /* ARTISTS */
    handleCreateArtist,
    handlefindArtists,
    handleGetTopArtists,
    handleRetrieveMostVisitedArtists,
    handleRetrieveAllArtistsWithSongs,

    /* SONGS */
    handleCreateSong,
    handlefindSongs,
    handleRetrieveSongsOfArtist,
    handleRetrieveSong,

    /* ARTISTS AND SONGS */
    handleFindArtistsSongsAndUsers,

    /* INTERPRETATIONS */
    handleAddInterpretationToSong,
    handleRetrieveInterpretationsFromSong,
    handleRetrieveInterpretationFromSong,
    handleRetrieveLastInterpretationsOfFollowed,
    handleRetrieveMostVisitedInterpretations,

    /* RANK */
    handleToggleOrUpdateRankToInterpretation,

    /* COMMENT */
    handleAddCommentToInterpretation,
    handleRemoveCommentFromInterpretation,

    /* SPOTIFY */
    handleCheckSpotifySession
} = require('./handlers')

var XMLHttpRequest = require('xhr2');

global.XMLHttpRequest = XMLHttpRequest

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

const { env: { MONGODB_URL, PORT = 8080 }, argv: [, , port = PORT] } = process

    ; (async () => {
        await connect(MONGODB_URL)

        console.log(`DB connected on ${MONGODB_URL}`)

        const api = express()

        api.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Headers', '*')
            res.setHeader('Access-Control-Allow-Methods', '*')
            res.setHeader('Access-Control-Allow-Origin', '*')

            next()
        })

        const jsonBodyParser = bodyParser.json()

        const routes = express.Router()

        api.use('/api', routes)

        /* USERS */
        routes.post('/users', jsonBodyParser, handleRegisterUser)
        routes.post('/users/auth', jsonBodyParser, handleAuthenticateUser)
        routes.get('/users/auth', handleValidateToken)
        routes.patch('/users/auth', jsonBodyParser, handleUpdatePassword)
        routes.get('/users', handleRetrieveUser)
        routes.get('/users/:username/profile', handleRetrieveUserByUsername)
        routes.get('/users/:userId/interpretations', handleRetrieveInterpretationsOfUser)
        routes.patch('/users', jsonBodyParser, handleUpdateUser)
        routes.patch('/users/image', handleUpdateUserImage)
        routes.get('/users/:userId/image', handleGetUserImage)
        routes.post('/users/:userIdToFollowOrUnfollow/follow', handleToggleFollow)
        routes.delete('/users', jsonBodyParser, handleUnregisterUser)

        /* ARTISTS */
        routes.post('/artists', jsonBodyParser, handleCreateArtist)
        routes.get('/artists', handlefindArtists)
        routes.post('/artists/top', jsonBodyParser, handleGetTopArtists),
        routes.get('/artists/most-visited', handleRetrieveMostVisitedArtists)
        routes.get('/artists/all', handleRetrieveAllArtistsWithSongs)

        /* SONGS */
        routes.post('/songs', jsonBodyParser, handleCreateSong)
        routes.get('/songs', handlefindSongs)
        routes.get('/artists/:artistName/songs/:songName', handleRetrieveSong)
        routes.get('/artists/:artistName/songs', handleRetrieveSongsOfArtist)
       
        /* INTERPRETATIONS */
        routes.post('/songs/:songId/interpretations', jsonBodyParser, handleAddInterpretationToSong)
        routes.get('/artists/:artistName/songs/:songName/interpretations', handleRetrieveInterpretationsFromSong)
        routes.get('/artists/:artistNae/songs/:songName/interpretations/:interpretationId', handleRetrieveInterpretationFromSong)
        routes.get('/interpretations/followed', handleRetrieveLastInterpretationsOfFollowed)
        routes.get('/interpretations/most-visited', handleRetrieveMostVisitedInterpretations)
        
        /* ARTISTS AND SONGS */
        routes.get('/search', handleFindArtistsSongsAndUsers)

        /* RANK */
        routes.post('/songs/:songId/interpretations/:interpretationId/rank', jsonBodyParser, handleToggleOrUpdateRankToInterpretation)

        /* COMMENT */
        routes.post('/songs/:songId/interpretations/:interpretationId/comments', jsonBodyParser, handleAddCommentToInterpretation)
        routes.delete('/songs/:songId/interpretations/:interpretationId/comments/:commentId', jsonBodyParser, handleRemoveCommentFromInterpretation)

        /* SPOTIFY */
        routes.post('/spotify/auth', jsonBodyParser, handleCheckSpotifySession)

        api.listen(port, () => console.log(`API running on port ${port}`))

        process.on('SIGINT', async () =>
            disconnect()
                .then(() => {
                    console.log('\nDB disconnected')

                    process.exit(0)
                })
        )
    })()