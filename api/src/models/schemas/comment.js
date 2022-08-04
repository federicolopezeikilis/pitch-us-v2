const { Schema, Types: { ObjectId } } = require('mongoose')

const comment = new Schema({
    user: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    likes: {
        type: [ObjectId]
    }
})

module.exports = comment