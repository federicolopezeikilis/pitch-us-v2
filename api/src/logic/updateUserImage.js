const { User } = require('../models')
const { validateObjectId } = require("../validators")
const busboy = require('busboy')
const admin = require("firebase-admin")
const { NotFoundError } = require('errors')

module.exports = (userId, contentType, inputStream) => {
    validateObjectId(userId)

    return new Promise((resolve, reject) => {
        const bb = busboy({ headers: { 'content-type': contentType } });

        bb.on('file', (name, file, info) => {
            const { filename, encoding, mimeType } = info

            console.log(
                `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
                filename,
                encoding,
                mimeType
            )

            const bucket = admin.storage().bucket()

            const newFilename = Date.now() + '.' + filename.split('.').pop()

            const firebaseFile = bucket.file(newFilename)

            const firebaseStream = firebaseFile.createWriteStream({
                metadata: {
                    contentType: mimeType
                }
            })

            file.pipe(firebaseStream)

            file.on('data', (data) => {
                console.log(`File [${name}] got ${data.length} bytes`);
            }).on('close', () => {
                console.log(`File [${name}] done`);
            }).on('error', error => {
                reject(new Error('Bb failed'))
            })

            firebaseStream.on('finish', async () => {
                

                const user = await User.findById(userId)

                if(!user) throw new NotFoundError(`user with id ${userId} not found`)

                if(user.profileImage) {
                    await bucket.file(user.profileImage).delete()
                }

                user.profileImage = newFilename
                await user.save()

                resolve()
            }).on('error', error => {
                reject(new Error('Firebase call failed'))
            })
        })

        inputStream.pipe(bb)
    })
}