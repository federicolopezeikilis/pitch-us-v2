const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { User, Artist, Song, Interpretation, Comment } = require('../models')
const { NotFoundError, AuthError, FormatError, ConflictError } = require('errors')
const { removeCommentFromInterpretation } = require('.')
const { expect } = require('chai')
const { validateObjectId } = require('../validators')


describe('addCommentToInterpretation', () => {
    let user1, user2, artist, song, interpretation1, interpretation2, comment1, comment2

    before(() => connect('mongodb://localhost:27017/pitch-us-test'))

    beforeEach(async () => {
        await Song.deleteMany()
        await Artist.deleteMany()
        await User.deleteMany()
        await Interpretation.deleteMany()

        user1 = await User.create({ username: 'wendypan', email: 'wendypan@gmail.com', password: 'Passw0rd' })
        user2 = await User.create({ username: 'pepito', email: 'pepitogrillo@gmail.com', password: 'Passw0rd' })
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

        song = await Song.create({ artist: artist._id.toString(), name: 'A tu lado', genres: [Song.ROCK], album: 'Detonador de sueños', date: new Date(2003, 0), interpretations: [interpretation1] })        
        
        comment1 = new Comment({ user: user1._id.toString(), text: 'This is the comment text' })
        comment2 = new Comment({ user: user2._id.toString(), text: 'This is comment 2' })
        comment3 = new Comment({ user: user1._id.toString(), text: 'This it comment 3'})
        
        interpretation1 = await Interpretation.create({ user: user1._id, song: song._id, content, comments: [comment1, comment2] })
        interpretation2 = await Interpretation.create({ user: user2._id, song: song._id, content, comments: [comment3]})
    })

    it('succeed on existing user, artist, song, interpretation and comment', async () => {
        const result = await removeCommentFromInterpretation(user1._id.toString(), song._id.toString(), interpretation1._id.toString(), comment1._id.toString())

        expect(result).to.be.undefined

        const interpretationFounded = await Interpretation.findById(interpretation1._id).populate({ path: 'comments' }).lean()

        expect(interpretationFounded.comments).to.have.lengthOf(1)
        expect(interpretationFounded.comments[0].user.toString()).to.equal(user2._id.toString())
        expect(interpretationFounded.comments[0].text).to.equal('This is comment 2')
        expect(interpretationFounded.comments[0].date).to.exists
    })

    it('fails on comment that does not belong to the user', async () => {
        try {
            await removeCommentFromInterpretation(user1._id.toString(), song._id.toString(), interpretation1._id.toString(), comment2._id.toString())

            throw new Error('it should not reach this point')

        } catch (error) {
            expect(error).to.be.instanceOf(ConflictError)
            expect(error.message).to.equal(`comment with id ${comment2._id.toString()} does not belong to user with id ${user1._id.toString()}`)
        }

        const interpretationFounded = await Interpretation.findById(interpretation1._id).populate({ path: 'comments' }).lean()

        expect(interpretationFounded.comments).to.have.lengthOf(2)
    })

    it('fails on existing user, artist, song, interpretationId, but unexisting commentId', async () => {
        const wrongId = new ObjectId().toString()

        try {
            await removeCommentFromInterpretation(user1._id.toString(), song._id.toString(), interpretation1._id.toString(), wrongId)

            throw new Error('it should not reach this point')

        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal(`comment with id ${wrongId} not found`)
        }

        const interpretationFounded = await Interpretation.findById(interpretation1._id).populate({ path: 'comments' }).lean()

        expect(interpretationFounded.comments).to.have.lengthOf(2)
    })

    it('fails commentId that does not belong to the interpretation', async () => {
        try {
            await removeCommentFromInterpretation(user1._id.toString(), song._id.toString(), interpretation1._id.toString(), comment3._id.toString())

            throw new Error('it should not reach this point')

        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal(`comment with id ${comment3._id.toString()} not found`)
        }

        const interpretationFounded = await Interpretation.findById(interpretation1._id).populate({ path: 'comments' }).lean()

        expect(interpretationFounded.comments).to.have.lengthOf(2)
    })

    it('fails on unexisting user', async () => {
        const wrongId = new ObjectId().toString()

        try {
            await removeCommentFromInterpretation(wrongId.toString(), song._id.toString(), interpretation1._id.toString(), comment1._id.toString())

            throw new Error('it should not reach this point')

        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user with id ${wrongId} not found`)
        }

        const interpretationFounded = await Interpretation.findById(interpretation1._id).populate({ path: 'comments' }).lean()

        expect(interpretationFounded.comments).to.have.lengthOf(2)
    })

    afterEach(async () => {
        await Song.deleteMany()
        await Artist.deleteMany()
        await User.deleteMany()
        await Interpretation.deleteMany()
    })

    after(() => disconnect())
})