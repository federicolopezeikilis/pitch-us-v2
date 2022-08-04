const { Schema, Types: { ObjectId } } = require('mongoose')

const user = new Schema({
    username: {
        type: String,
        minLength: 4,
        required: true,
        unique: true,
        inmutable: true
    },
    password: {
        type: String,
        minLength: 8,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    dateOfBirth: {
        type: Date
    },
    spotifySession: {
        type: Object
    },
    profileImage: {
        type: String
    },
    following: {
        type: [ObjectId],
        ref: 'User'
    },
    followers: {
        type: [ObjectId],
        ref: 'User'
    }
})

module.exports = user