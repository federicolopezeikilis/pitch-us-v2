const { NotFoundError } = require("errors")
const { User } = require("../models")
const { validateObjectId } = require("../validators")
const { createReadStream } = require('fs')

module.exports = async (userId, outputStream) => {
    validateObjectId(userId)
    

    const user = await User.findById(userId)

    if (!user) throw new NotFoundError(`user with id ${userId} not found`)

    if (!user.profileImage) {
        const readStream = createReadStream('./src/public/user-default-icon.png').pipe(outputStream)

        return new Promise((resolve, reject) => {
            readStream.on('finish', () => {
            resolve()

        }).on('error', error => { reject(error) })
        })
    } else {
        const admin = require("firebase-admin")

        const bucket = admin.storage().bucket()

        const readStream = bucket.file(user.profileImage).createReadStream()

        return new Promise((resolve, reject) => {
            readStream.on('response', () => {
                readStream.pipe(outputStream)

            }).on('data', chunk => {
                console.log(`chunk has ${chunk.byteLength} bytes`)

            }).on('finish', e => {
                resolve()

            }).on('error', error => {
                if (error.code === 404 && error.message.includes('No such object')) {
                    const readStream = createReadStream('./src/public/user-default-icon.png').pipe(outputStream)

                    readStream.on('finish', () => {
                        resolve()

                    }).on('error', error => { reject(error) })

                } else {
                    reject(error)
                }
            })
        })
    }
}