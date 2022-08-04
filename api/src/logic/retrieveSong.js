const { Song, Artist } = require("../models")
const { NotFoundError } = require('errors')
const { validateStringNotEmptyOrBlank } = require('validators')

module.exports = (songName, artistName) => {
    validateStringNotEmptyOrBlank(songName)
    validateStringNotEmptyOrBlank(artistName)

    return (async () => {
        const reArtist = new RegExp(artistName)

        const artist = await Artist.findOne({ name: { $regex: reArtist, $options: 'i' } })

        if (!artist) throw new NotFoundError(`artist ${artistName} not found`)

        const reSong = new RegExp(songName)

        const song = await Song.findOne({ name: { $regex: reSong, $options: 'i' }, artist: artist._id }).populate('artist', 'name').lean()

        if (!song) throw new NotFoundError(`song ${songName} not found`)

        song.id = song._id.toString()

        delete song._id
        delete song.__v
        delete song.country
        delete song.genres
        delete song.album
        delete song.date
        delete song.interpretations

        return song
    })()
}