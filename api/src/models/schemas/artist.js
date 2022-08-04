const { Schema } = require('mongoose')
const countries = require('data')

const artist = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    genres: {
        type: [Number]
    },
    country: {
        type: String,
        emun: Object.keys(countries)
    },
    visits: {
        type: Number,
        default: 0
    }
})

module.exports = artist