const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { User, Artist, Song } = require('../models')
const { NotFoundError } = require('errors')
const { createSong } = require('./')
const { validateObjectId } = require('../validators')
const { expect } = require('chai')

describe('createSong', () => {
    let user

    before(() => connect('mongodb://localhost:27017/pitch-us-test'))

    beforeEach(async () => {
        await Song.deleteMany()
        await Artist.deleteMany()
        await User.deleteMany()

        user = await User.create({ username: 'wendypan', email: 'wendypan@gmail.com', password: 'Passw0rd' })
    })

    describe('on existing artist and song', () => {
        let laRengaId

        beforeEach(async () => {
            const { _id } = await Artist.create({ name: 'La Renga', genres: [Artist.ROCK], country: 'AR' })
            laRengaId = _id

            await Song.create({ artist: laRengaId.toString(), name: 'A tu lado', genres: [Song.ROCK], album: 'Detonador de sueños', date: new Date(2003, 0) })
        })

        it('succeeds on new song', async () => {
            const result = await createSong(user.id, { artist: laRengaId.toString(), name: 'La razón que te demora', genres: [Song.ROCK], album: 'Detonador de sueños', date: new Date(2003, 0) })

            expect(validateObjectId(result.id)).to.be.undefined

            const createdSong = await Song.findById(result.id)

            expect(createdSong.name).to.equal('La razón que te demora')
            expect(createdSong.artist.toString()).to.equal(laRengaId.toString())
            expect(createdSong.genres[0]).to.equal(Song.ROCK)
            expect(createdSong.album).to.equal('Detonador de sueños')
        })

        it('succeeds on new song with two genres', async () => {
            const result = await createSong(user.id, { artist: laRengaId.toString(), name: 'La razón que te demora', genres: [Song.ROCK, Song.PUNK], album: 'Detonador de sueños', date: new Date(2003, 0) })

            expect(validateObjectId(result.id)).to.be.undefined

            const createdSong = await Song.findById(result.id)

            expect(createdSong.name).to.equal('La razón que te demora')
            expect(createdSong.artist.toString()).to.equal(laRengaId.toString())
            expect(createdSong.genres).to.have.length(2)
            expect(createdSong.genres[0]).to.equal(Song.ROCK)
            expect(createdSong.genres[1]).to.equal(Song.PUNK)
            expect(createdSong.album).to.equal('Detonador de sueños')
        })
    })

    it('fails on unexisting artist', async () => {
        const wrongArtistId = new ObjectId().toString()

        try {
            await createSong(user.id, { artist: wrongArtistId, name: 'La razón que te demora', genres: [Song.ROCK], album: 'Detonador de sueños', date: new Date(2003, 0) })

            throw new Error('it should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceof(NotFoundError)
            expect(error.message).to.equal(`artist with id ${wrongArtistId} not found`)
        }
    })

    afterEach(() => {
        Song.deleteMany()
        Artist.deleteMany()
        User.deleteMany()
    })

    after(() => disconnect())
})