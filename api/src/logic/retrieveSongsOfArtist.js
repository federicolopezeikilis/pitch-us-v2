const { NotFoundError } = require('errors')
const { Song, Artist } = require('../models')
const { validateStringNotEmptyOrBlank } = require('validators')

module.exports = async artistName => {
    validateStringNotEmptyOrBlank(artistName)

    const re = new RegExp(artistName)

    const artist = await Artist.findOne({ name: { $regex: re , $options: 'i' } })
    
    if (!artist) throw new NotFoundError(`artist ${artistName} not found`)

    artist.visits++
    await artist.save()

    const songs = await Song.find({ artist: artist._id }).populate('artist', 'name').lean()
    
    return songs.map(song => {
        song.id = song._id.toString()
        delete song._id
        delete song.__v
        delete song.country
        delete song.genres
        delete song.album
        delete song.date
        delete song.interpretations
        
        return song
    })
}