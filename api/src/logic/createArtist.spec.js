const { connect, disconnect } = require('mongoose')
const { Artist, User } = require('../models')
const { ConflictError } = require('errors')
const { createArtist } = require('./')
const { validateObjectId } = require('../validators')
const { expect } = require('chai')

describe('createArtist', () => {
    let user

    before(() => connect('mongodb://localhost:27017/pitch-us-test'))

    beforeEach(async () => {
        await User.deleteMany()
        await Artist.deleteMany()

        user = await User.create({ username: 'wendypan', email: 'wendypan@gmail.com', password: 'Passw0rd' })
        await Artist.create({ name: 'La Renga', genres: [Artist.ROCK], country: 'AR' })
    })

    it('succeeds on new artist', async () => {
        const result = await createArtist(user._id.toString(), 'Divididos', [Artist.ROCK], 'AR')

        expect(result.id).to.be.string
        expect(validateObjectId(result.id)).to.be.undefined

        const createdArtist = await Artist.findById(result.id)

        expect(createdArtist.name).to.equal('Divididos')
        expect(createdArtist.genres[0]).to.equal(Artist.ROCK)
        expect(createdArtist.country).to.equal('AR')
    })

    it('succeeds on new artist with two genres', async () => {
        const result = await createArtist(user._id.toString(), 'Divididos', [Artist.ROCK, Artist.PUNK], 'AR')

        expect(result.id).to.be.string
        expect(validateObjectId(result.id)).to.be.undefined

        const createdArtist = await Artist.findById(result.id)

        expect(createdArtist.name).to.equal('Divididos')
        expect(createdArtist.genres[0]).to.equal(Artist.ROCK)
        expect(createdArtist.genres[1]).to.equal(Artist.PUNK)
        expect(createdArtist.country).to.equal('AR')
    })

    it('fails when artist already exists', async () => {
        try {
            await createArtist(user._id.toString(), 'La Renga', [Artist.PUNK], 'BR')

            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(ConflictError)
            expect(error.message).to.equal(`artist La Renga already exists`)
        }
    })

    it('fails when country is not included in model', async () => {
        try {
            await createArtist(user._id.toString(), 'Divididos', [Artist.PUNK], 'ZZ')

            throw new Error('should not reach this point')

        } catch (error) {
            expect(error).to.be.instanceOf(ConflictError)
            
            expect(error.message).to.equal(`invalid country code ZZ`)
        }
    })

    it('fails on incorrect genre', async () => {
        try {
            await createArtist(user._id.toString(), 'Divididos', [26], 'AR')

            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(ConflictError)
            expect(error.message).to.equal(`invalid genre`)
        }
    })

    afterEach(() => {
        Artist.deleteMany()
        User.deleteMany()
    })

    after(() => disconnect())
})