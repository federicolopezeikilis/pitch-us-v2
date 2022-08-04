const { Schema, Types: { ObjectId } } = require('mongoose')

const rank = new Schema({
    user: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    amount: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
    }
})

module.exports = rank