const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { Artist } = require('../models')
const { findArtists } = require('./')
const { expect } = require('chai')

describe('findArtists', () => {
    before(() => connect('mongodb://localhost:27017/pitch-us-test'))

    beforeEach(async () => {
        Artist.deleteMany()

        Artist.create({ name: 'La Polla Records', genres: [Artist.PUNK], country: 'ES' })
        Artist.create({ name: 'La Renga', genres: [Artist.ROCK], country: 'AR' })
        Artist.create({ name: 'Salta la banca', genres: [Artist.ROCK], country: 'AR' })
        Artist.create({ name: 'Bandalos Chinos', genres: [Artist.INDIE], country: 'AR' })
    })

    it('succeeds on existing artists and three matches in lower case', async () => {
        const result = await findArtists('la')

        expect(result).to.be.instanceOf(Array)
        expect(result).to.have.length(3)

        result.forEach(artist => {
            expect(artist._id).to.be.undefined
            expect(artist.genres).to.be.undefined
            expect(artist.country).to.be.undefined
            expect(artist.__v).to.be.undefined
            expect(artist.id).to.exist
        })

        const artistsNames = ['La Renga', 'La Polla Records', 'Salta la banca']

        artistsNames.forEach(artistName => {
            const artistIsIncluded = result.some(artist => artistName === artist.name)

            expect(artistIsIncluded).to.be.true
        })
    })

    it('succeeds on existing artists and three matches in upper case', async () => {
        const result = await findArtists('LA')

        expect(result).to.be.instanceOf(Array)
        expect(result).to.have.length(3)

        result.forEach(artist => {
            expect(artist._id).to.be.undefined
            expect(artist.genres).to.be.undefined
            expect(artist.country).to.be.undefined
            expect(artist.__v).to.be.undefined
            expect(artist.id).to.exist
        })

        const artistsNames = ['La Renga', 'La Polla Records', 'Salta la banca']

        artistsNames.forEach(artistName => {
            const artistIsIncluded = result.some(artist => artistName === artist.name)

            expect(artistIsIncluded).to.be.true
        })
    })

    it('succeeds on existing artists and one match', async () => {
        const result = await findArtists('chi')

        expect(result).to.be.instanceOf(Array)
        expect(result).to.have.length(1)

        expect(result[0]._id).to.be.undefined
        expect(result[0].genres).to.be.undefined
        expect(result[0].country).to.be.undefined
        expect(result[0].__v).to.be.undefined
        expect(result[0].id).to.exist
        expect(result[0].name).to.equal('Bandalos Chinos')
    })

    it('succeeds on existing artists and no matches', async () => {
        const result = await findArtists('zZzZ')

        expect(result).to.be.instanceOf(Array)
        expect(result).to.have.length(0)
    })

    afterEach(() => Artist.deleteMany())

    after(() => disconnect())
})