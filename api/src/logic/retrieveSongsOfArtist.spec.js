const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { Song, Artist } = require('../models')
const { retrieveSongsOfArtist } = require('./')
const { expect } = require('chai')
const { NotFoundError } = require('errors')

describe('retrieveSongsOfArtist', () => {
    before(() => connect('mongodb://localhost:27017/pitch-us-test'))
    let laRenga, laRengaTres, divididos

    beforeEach(async () => {
        await Artist.deleteMany()
        await Song.deleteMany()

        laRenga = await Artist.create({ name: 'La Renga', genres: [Artist.ROCK], country: 'AR' })

        laRengaTres = await Artist.create({ name: 'La Renga Tres', genres: [Artist.INDIE], country: 'AR' })

        divididos = await Artist.create({ name: 'Divididos', genres: [Artist.ROCK], country: 'AR' })

        await Promise.all([
            Song.create({ artist: laRenga._id.toString(), name: 'La razón que te demora', genres: [Song.ROCK], album: 'Detonador de sueños', date: new Date(2003, 0) }),
            Song.create({ artist: laRengaTres._id.toString(), name: 'Que demasiado', genres: [Song.INDIE] }),
            Song.create({ artist: laRengaTres._id.toString(), name: 'Dije tu nombre', genres: [Song.INDIE] }),
            Song.create({ artist: laRengaTres._id.toString(), name: 'La herida', genres: [Song.INDIE] })
        ])
    })

    it('succeeds on existing artist with three songs', async () => {
        const result = await retrieveSongsOfArtist(laRengaTres.name)

        expect(result).to.be.instanceOf(Array)
        
        expect(result).to.have.length(3)

        result.forEach(song => {
            expect(song._id).to.be.undefined
            expect(song.genres).to.be.undefined
            expect(song.album).to.be.undefined
            expect(song.date).to.be.undefined
            expect(song.interpretations).to.be.undefined
            expect(song.__v).to.be.undefined
            expect(song.id).to.exist
        })

        const songNames = ['Que demasiado', 'Dije tu nombre', 'La herida']

        songNames.forEach(songName => {
            const songIsIncluded = result.some(song => songName === song.name)

            expect(songIsIncluded).to.be.true
        })
    })

    it('succeeds on existing artist with one song', async () => {
        const result = await retrieveSongsOfArtist(laRenga.name)

        expect(result).to.be.instanceOf(Array)
        expect(result).to.have.length(1)

        expect(result[0]._id).to.be.undefined
        expect(result[0].genres).to.be.undefined
        expect(result[0].album).to.be.undefined
        expect(result[0].date).to.be.undefined
        expect(result[0].interpretations).to.be.undefined
        expect(result[0].__v).to.be.undefined
        expect(result[0].id).to.exist
        expect(result[0].name).to.equal('La razón que te demora')
    })

    it('succeeds on existing artist with no songs', async () => {
        const result = await retrieveSongsOfArtist(divididos.name)

        expect(result).to.be.instanceOf(Array)
        expect(result).to.have.length(0)
    })

    it('fails on unexisting artist', async () => {
        try {
            await retrieveSongsOfArtist('Shakira')

            throw new Error('it should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceof(NotFoundError)
            expect(error.message).to.equal(`artist Shakira not found`)
        }
    })

    afterEach(() => {
        Artist.deleteMany()
        Song.deleteMany()
    })

    after(() => disconnect())
})