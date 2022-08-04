const { model } = require('mongoose')
const { comment, interpretation, user, artist, song, rank } = require('./schemas')

const Comment = new model('Comment', comment)
const Interpretation = new model('Interpretation', interpretation)
const User = new model('User', user)
const Artist = new model('Artist', artist)
const Song = new model('Song', song)
const Rank = new model('Rank', rank)

Song.ROCK = 0
Song.POP = 1
Song.TRAP = 2
Song.INDIE = 3
Song.JAZZ = 4
Song.FOLK = 5
Song.BLUES = 6
Song.COUNTRY = 7
Song.HIP_HOP = 8
Song.HEAVY_METAL = 9
Song.CLASSICAL_MUSIC = 10
Song.K_POP = 11
Song.REGGAETON = 12
Song.CUMBIA = 13
Song.SALSA = 14
Song.REGGAE = 15
Song.RHYTHM_AND_BLUES = 16
Song.GOSPEL = 17
Song.SOUL = 18
Song.PUNK = 19
Song.FUNK = 20
Song.SKA = 21
Song.GARAGE = 22
Song.FLAMENCO = 23
Song.RUMBA = 24

Artist.ROCK = 0
Artist.POP = 1
Artist.TRAP = 2
Artist.INDIE = 3
Artist.JAZZ = 4
Artist.FOLK = 5
Artist.BLUES = 6
Artist.COUNTRY = 7
Artist.HIP_HOP = 8
Artist.HEAVY_METAL = 9
Artist.CLASSICAL_MUSIC = 10
Artist.K_POP = 11
Artist.REGGAETON = 12
Artist.CUMBIA = 13
Artist.SALSA = 14
Artist.REGGAE = 15
Artist.RHYTHM_AND_BLUES = 16
Artist.GOSPEL = 17
Artist.SOUL = 18
Artist.PUNK = 19
Artist.FUNK = 20
Artist.SKA = 21
Artist.GARAGE = 22
Artist.FLAMENCO = 23
Artist.RUMBA = 24

module.exports = {
    Comment,
    Interpretation,
    User,
    Artist,
    Song,
    Rank
}