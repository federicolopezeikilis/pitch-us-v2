const handleRequestSpotifyAccesToken = require('./handleRequestSpotifyAccesToken');

module.exports = {
    /* USERS */ 
    handleRegisterUser: require('./handleRegisterUser'),
    handleAuthenticateUser: require('./handleAuthenticateUser'),
    handleUpdatePassword: require('./handleUpdatePassword'),
    handleRetrieveUser: require('./handleRetrieveUser'),
    handleRetrieveUserByUsername: require('./handleRetrieveUserByUsername'),
    handleRetrieveInterpretationsOfUser: require('./handleRetrieveInterpretationsOfUser'),
    handleUpdateUser: require('./handleUpdateUser'),
    handleUpdateUserImage: require('./handleUpdateUserImage'),
    handleGetUserImage: require('./handleGetUserImage'),
    handleToggleFollow: require('./handleToggleFollow'),
    handleUnregisterUser: require('./handleUnregisterUser'),

    /* VALIDATE TOKEN */
    handleValidateToken: require('./handleValidateToken'),

    /* ARTISTS */
    handleCreateArtist: require('./handleCreateArtist'),
    handlefindArtists: require('./handleFindArtists'),
    handleGetTopArtists: require('./handleGetTopArtists'),
    handleRetrieveMostVisitedArtists: require('./handleRetrieveMostVisitedArtists'),
    handleRetrieveAllArtistsWithSongs: require('./handleRetrieveAllArtistsWithSongs'),

    /* SONGS */
    handleCreateSong: require('./handleCreateSong'),
    handlefindSongs: require('./handleFindSongs'),
    handleRetrieveSong: require('./handleRetrieveSong'),
    handleRetrieveSongsOfArtist: require('./handleRetrieveSongsOfArtist'),
    
    /* ARTISTS AND SONGS */
    handleFindArtistsSongsAndUsers: require('./handleFindArtistsSongsAndUsers'),

    /* INTERPRETATIONS */
    handleAddInterpretationToSong: require('./handleAddInterpretationToSong'),
    handleRetrieveInterpretationsFromSong: require('./handleRetrieveInterpretationsFromSong'),
    handleRetrieveInterpretationFromSong: require('./handleRetrieveInterpretationFromSong'),
    handleRetrieveLastInterpretationsOfFollowed: require('./handleRetrieveLastInterpretationsOfFollowed'),
    handleRetrieveMostVisitedInterpretations: require('./handleRetrieveMostVisitedInterpretations'),

    /* RANK */
    handleToggleOrUpdateRankToInterpretation: require('./handleToggleOrUpdateRankToInterpretation'),

    /* COMMENTS */
    handleAddCommentToInterpretation: require('./handleAddCommentToInterpretation'),
    handleRemoveCommentFromInterpretation: require('./handleRemoveCommentFromInterpretation'),

    /* SPOTIFY */
    handleRequestSpotifyAccesToken: require('./handleRequestSpotifyAccesToken'),
    handleCheckSpotifySession: require('./handleCheckSpotifySession')
}

