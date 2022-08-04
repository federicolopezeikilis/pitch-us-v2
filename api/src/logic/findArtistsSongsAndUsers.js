const { Artist, Song, User } = require('../models')
const { validateCategory, validateStringNotEmptyOrBlank } = require('validators')

module.exports = async (query, category) => {
    validateStringNotEmptyOrBlank(query)
    validateCategory(category)

    const result = {}

    const re = new RegExp(query)

    if (category === 'all' || category === 'artists') {
        const artists = await Artist.find({ name: { $regex: re, $options: 'i' } }).lean()

        result.artists = artists.map(artist => {
            artist.id = artist._id.toString()
            delete artist._id
            delete artist.__v
            delete artist.country
            delete artist.genres

            return artist
        })
    }

    if (category === 'all' || category === 'songs') {
        const songs = await Song.find({ name: { $regex: re, $options: 'i' } }).populate('artist', 'name').lean()

        result.songs = songs.map(song => {
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

    if (category === 'all' || category === 'users') {
        const users = await User.find({ username: { $regex: re, $options: 'i' } }).lean()

        result.users = users.map(user => {
            user.id = user._id.toString()

            delete user._id
            delete user.__v

            return user
        })
    }

    return result
}