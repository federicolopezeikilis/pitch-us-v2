const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { User, Artist, Song, Interpretation } = require('../models')
const { NotFoundError, FormatError } = require('errors')
const { addCommentToInterpretation } = require('.')
const { expect } = require('chai')
const { validateObjectId } = require('../validators')


describe('addCommentToInterpretation', () => {
    let user, artist, song, interpretation

    before(() => connect('mongodb://localhost:27017/pitch-us-test'))

    beforeEach(async () => {
        await Song.deleteMany()
        await Artist.deleteMany()
        await User.deleteMany()
        await Interpretation.deleteMany()

        user = await User.create({ username: 'wendypan', email: 'wendypan@gmail.com', password: 'Passw0rd' })
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

        
        song = await Song.create({ artist: artist._id.toString(), name: 'A tu lado', genres: [Song.ROCK], album: 'Detonador de sueños', date: new Date(2003, 0), interpretations: [interpretation] })
        
        interpretation = await Interpretation.create({ user: user._id, song: song._id, content })
    })

    it('succeed on existing user, artist, song and interpretation', async () => {
        const commentText = 'This is the comment'

        const commentId = await addCommentToInterpretation(user._id.toString(), song._id.toString(), interpretation._id.toString(), commentText)

        validateObjectId(commentId)

        const interpretationFounded = await Interpretation.findById(interpretation._id).populate({ path: 'comments' }).lean()

        expect(interpretationFounded.comments).to.have.lengthOf(1)
        expect(interpretationFounded.comments[0].user.toString()).to.equal(user._id.toString())
        expect(interpretationFounded.comments[0].text).to.equal(commentText)
        expect(interpretationFounded.comments[0].date).to.exists
    })

    it('fails on existing user, artist, song and interpretation, but empty text', async () => {
        try {
            await addCommentToInterpretation(user._id.toString(), song._id.toString(), interpretation._id.toString(), '')

            throw new Error('it should not reach this point')

        } catch(error) {
            expect(error).to.be.instanceOf(FormatError)
            expect(error.message).to.equal('comment is empty')
        }

        const interpretationFounded = await Interpretation.findById(interpretation._id).populate({ path: 'comments' }).lean()

        expect(interpretationFounded.comments).to.have.lengthOf(0)
    })

    it('fails on existing user, artist and song, but unexisting interpretationId', async () => {
        const wrongId = new ObjectId().toString()
        
        try {
            await addCommentToInterpretation(user._id.toString(), song._id.toString(), wrongId, 'This is the comment')

            throw new Error('it should not reach this point')

        } catch(error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal(`interpretation with id ${wrongId} not found`)
        }

        const interpretationFounded = await Interpretation.findById(interpretation._id).populate({ path: 'comments' }).lean()

        expect(interpretationFounded.comments).to.have.lengthOf(0)
    })

    it('fails on unexisting user', async () => {
        const wrongId = new ObjectId().toString()
        
        try {
            await addCommentToInterpretation(wrongId, interpretation._id.toString(), song._id.toString(), 'This is the comment')

            throw new Error('it should not reach this point')

        } catch(error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user with id ${wrongId} not found`)
        }

        const interpretationFounded = await Interpretation.findById(interpretation._id).populate({ path: 'comments' }).lean()

        expect(interpretationFounded.comments).to.have.lengthOf(0)
    })

    afterEach(async () => {
        await Song.deleteMany()
        await Artist.deleteMany()
        await User.deleteMany()
        await Interpretation.deleteMany()
    })

    after(() => disconnect())
})