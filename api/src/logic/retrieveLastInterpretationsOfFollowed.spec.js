const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { User, Artist, Song, Interpretation } = require('../models')
const { NotFoundError } = require('errors')
const { expect } = require('chai')
const retrieveLastInterpretationsOfFollowed = require('./retrieveLastInterpretationsOfFollowed')


describe('retrieveLastInterpretationsOfFollowed', () => {
    let user1, user2, user3, user4, artist, song1, song2, interpretation1, interpretation2, interpretation3, interpretation4, interpretation5, interpretation6, interpretation7, interpretation8, interpretation9

    before(() => connect('mongodb://localhost:27017/pitch-us-test'))

    beforeEach(async () => {
        await Song.deleteMany()
        await Artist.deleteMany()
        await User.deleteMany()
        await Interpretation.deleteMany()

        user1 = await User.create({ username: 'wendypan', email: 'wendypan@gmail.com', password: 'Passw0rd' })
        user2 = await User.create({ username: 'pepito', email: 'pepitogrillo@gmail.com', password: 'Passw0rd' })
        user3 = await User.create({ username: 'carlos', email: 'carlos@gmail.com', password: 'Passw0rd' })
        user4 = await User.create({ username: 'pedro', email: 'pedro@gmail.com', password: 'Passw0rd', following: [user1._id, user2._id] })
        artist = await Artist.create({ name: 'La Renga', genres: [Artist.ROCK], country: 'AR' })

        const content = `E5
        Pobreza en los estómagos
              C5                    RIFF1
        Más pobreza en la cabeza
        E5                            C5          RIFF1
        No queda nada a salvo de este gran error
        E5
        El mundo sigue así
              C5                 RIFF1
        Tan terrible y abrumado
        E5                          C5               RIFF2
        Que sentirte a mi lado me hará mucho mejor`

        song1 = await Song.create({ artist: artist._id.toString(), name: 'A tu lado', genres: [Song.ROCK], album: 'Detonador de sueños', date: new Date(2003, 0) })
        song2 = await Song.create({ artist: artist._id.toString(), name: 'La razón que te demora', genres: [Song.ROCK], album: 'Detonador de sueños', date: new Date(2003, 0) })

        interpretation1 = await Interpretation.create({ user: user1._id, song: song1._id, content: 'interpretation1' + content })
        interpretation2 = await Interpretation.create({ user: user2._id, song: song1._id, content: 'interpretation2' + content })
        interpretation3 = await Interpretation.create({ user: user1._id, song: song1._id, content: 'interpretation3' + content })
        interpretation4 = await Interpretation.create({ user: user1._id, song: song2._id, content: 'interpretation4' + content })
        interpretation5 = await Interpretation.create({ user: user4._id, song: song2._id, content: 'interpretation5' + content })
        interpretation6 = await Interpretation.create({ user: user3._id, song: song2._id, content: 'interpretation6' + content })
        interpretation7 = await Interpretation.create({ user: user2._id, song: song2._id, content: 'interpretation7' + content })

        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                interpretation8 = await Interpretation.create({ user: user2._id, song: song2._id, content: 'interpretation8' + content })
                
                resolve()
                }, 1000)
        })
    })

    it('should succeed on existing interpretations and followed users', async () => {
        const result = await retrieveLastInterpretationsOfFollowed(user4._id.toString())

        expect(result).to.be.instanceOf(Array)
        expect(result).to.have.lengthOf(5)

        result.forEach(interpretation => {
            const some = [interpretation8, interpretation2, interpretation3, interpretation4, interpretation7].some(elem => elem._id.toString() === interpretation.id)

            expect(some).to.be.true
        })
    })

    it('should succeed on existing interpretations and no followed users', async () => {
        const result = await retrieveLastInterpretationsOfFollowed(user3._id.toString())

        expect(result).to.be.instanceOf(Array)
        expect(result).to.have.lengthOf(0)
    })

    afterEach(async () => {
        await Song.deleteMany()
        await Artist.deleteMany()
        await User.deleteMany()
        await Interpretation.deleteMany()
    })

    after(() => disconnect())
})
