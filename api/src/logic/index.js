module.exports = {
    /* USERS */
    registerUser: require('./registerUser'),
    authenticateUser: require('./authenticateUser'),
    authenticateOrRegisterUser: require('./authenticateOrRegisterUser'),
    userExists: require('./userExists'),
    updatePassword: require('./updatePassword'),
    retrieveUser: require('./retrieveUser'),
    retrieveBothFollowingsAndFollowers: require('./retrieveBothFollowingsAndFollowers'),
    retrieveUserByUsername: require('./retrieveUserByUsername'),
    retrieveAllUsernames: require('./retrieveAllUsernames'),
    retrieveInterpretationsOfUser: require('./retrieveInterpretationsOfUser'),
    updateUser: require('./updateUser'),
    updateUserImage: require('./updateUserImage'),
    toggleFollow: require('./toggleFollow'),
    getUserImage: require('./getUserImage'),
    unregisterUser: require('./unregisterUser'),

    /* CHAT */
    addMessageToChat: require('./addMessageToChat'),
    retrieveChat: require('./retrieveChat'),

    /* ARTISTS */
    createArtist: require('./createArtist'),
    findArtists: require('./findArtists'),
    getTopArtists: require('./getTopArtists'),
    retrieveMostVisitedArtists: require('./retrieveMostVisitedArtists'),
    retrieveAllArtistsWithSongs: require('./retrieveAllArtistsWithSongs'),

    /* SONGS */
    createSong: require('./createSong'),
    findSongs: require('./findSongs'),
    retrieveSongsOfArtist: require('./retrieveSongsOfArtist'),
    retrieveSong: require('./retrieveSong'),

    /* SEARCH */
    findArtistsSongsAndUsers: require('./findArtistsSongsAndUsers'),

    /* INTEPRRETATIONS */
    addInterpretationToSong: require('./addInterpretationToSong'),
    retrieveInterpretationsFromSong: require('./retrieveInterpretationsFromSong'),
    retrieveInterpretationFromSong: require('./retrieveInterpretationFromSong'),
    removeInterpretationFromSong: require('./removeInterpretationFromSong'),
    retrieveLastInterpretationsOfFollowed: require('./retrieveLastInterpretationsOfFollowed'),
    retrieveMostVisitedInterpretations: require('./retrieveMostVisitedIntepretations'),

    /* RANK */
    toggleOrUpdateRankToInterpretation: require('./toggleOrUpdateRankToInterpretation'),
    
    /* COMMENTS */
    addCommentToInterpretation: require('./addCommentToInterpretation'),
    removeCommentFromInterpretation: require('./removeCommentFromInterpretation'),

    /* SPOTIFY */
    checkSpotifySession: require('./checkSpotifySession'),
    requestSpotifyAccessToken: require('./requestSpotifyAccessToken')
}