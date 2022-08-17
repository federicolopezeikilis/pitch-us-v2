const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { User, Artist, Song, Interpretation } = require('../models')
const { NotFoundError } = require('errors')
const retrieveInterpretationsOfUser = require('./retrieveInterpretationsOfUser')
const { expect } = require('chai')


describe('retrieveInterpretationsOfUser', () => {
    let user1, user2, user3, artist, song1, song2, interpretation1, interpretation2, interpretation3, interpretation4

    before(() => connect('mongodb://localhost:27017/pitch-us-test'))

    beforeEach(async () => {
        await Song.deleteMany()
        await Artist.deleteMany()
        await User.deleteMany()
        await Interpretation.deleteMany()

        user1 = await User.create({ username: 'wendypan', email: 'wendypan@gmail.com', password: 'Passw0rd' })
        user2 = await User.create({ username: 'pepito', email: 'pepitogrillo@gmail.com', password: 'Passw0rd' })
        user3 = await User.create({ username: 'carlos', email: 'carlos@gmail.com', password: 'Passw0rd' })
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

        song1 = await Song.create({ artist: artist._id.toString(), name: 'A tu lado', genres: [Song.ROCK], album: 'Detonador de sueños', date: new Date(2003, 0)})
        song2 = await Song.create({ artist: artist._id.toString(), name: 'La razón que te demora', genres: [Song.ROCK], album: 'Detonador de sueños', date: new Date(2003, 0)})
        
        interpretation1 = await Interpretation.create({ user: user1._id, song: song1._id, content })
        interpretation2 = await Interpretation.create({ user: user2._id, song: song1._id, content })
        interpretation3 = await Interpretation.create({ user: user1._id, song: song1._id, content })
        interpretation4 = await Interpretation.create({ user: user1._id, song: song2._id, content })
    })

    it('succeed on existing user, artist, song and interpretations', async () => {
        const result = await retrieveInterpretationsOfUser(user1._id.toString())

        expect(result).to.be.instanceOf(Array)
        expect(result).to.have.lengthOf(3)

        result.forEach(interpretation => {
            expect(interpretation.user).to.equal(user1._id.toString())
            expect(interpretation.song.name).to.be.string
            expect(interpretation.song.artist.name).to.be.string
            expect(interpretation.song.id).to.be.string
            expect(interpretation.song.artist.id).to.be.string
            expect(interpretation.song.artist._id).to.be.undefined
            expect(interpretation.song._id).to.be.undefined

            const some = [interpretation1, interpretation3, interpretation4].some(elem => elem._id.toString() === interpretation.id)
            
            expect(some).to.be.true
        })
    })

    it('succeed on existing user with no interpretations', async () => {
        const result = await retrieveInterpretationsOfUser(user3._id.toString())

        expect(result).to.be.instanceOf(Array)
        expect(result).to.have.lengthOf(0)
    })

    it('fails on unexisting user', async () => {
        const wrongId = new ObjectId

        try {
            await retrieveInterpretationsOfUser(wrongId.toString())

            throw new Error('it should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user with id ${wrongId.toString()} not found`)
        }
    })

    afterEach(async () => {
        await Song.deleteMany()
        await Artist.deleteMany()
        await User.deleteMany()
        await Interpretation.deleteMany()
    })

    after(() => disconnect())
})