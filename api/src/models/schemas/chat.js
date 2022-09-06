const { Schema, Types: { ObjectId } } = require("mongoose")

const chat = new Schema({
    users: {
        type: [ObjectId],
        ref: 'User',
        required: true
    },
    messages: [
        {
            user: {
                type: ObjectId,
                ref: 'User',
                required: true
            },
            text: {
                type: String,
                required: true
            }
        }
    ]
})

module.exports = chat