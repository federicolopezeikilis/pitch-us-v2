const { Schema, Types: { ObjectId } } = require('mongoose')
const interpretation = require('./interpretation')

const song = new Schema({
    artist: {
        type: ObjectId,
        required: true,
        ref: 'Artist'
    },
    name: {
        type: String,
        required: true
    },
    genres: {
        type: [Number]
    },
    album: {
        type: String
    },
    date: {
        type: Date
    }
})

module.exports = song