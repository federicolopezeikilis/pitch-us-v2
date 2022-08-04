const { connect, disconnect } = require('mongoose')
const { Song, Artist } = require('../models')
const { findSongs } = require('./')
const { expect } = require('chai')

describe('findSongs', () => {
    before(() => connect('mongodb://localhost:27017/pitch-us-test'))

    beforeEach(async () => {
        await Artist.deleteMany()
        await Song.deleteMany()

        const { _id: laRengaId } = await Artist.create({ name: 'La Renga', genres: [Artist.ROCK], country: 'AR' })
        const { _id: bandalosChinosId } = await Artist.create({ name: 'Bandalos Chinos', genres: [Artist.INDIE], country: 'AR' })

        await Promise.all([
            Song.create({ artist: laRengaId.toString(), name: 'La razón que te demora', genres: [Song.ROCK], album: 'Detonador de sueños', date: new Date(2003, 0) }),
            Song.create({ artist: bandalosChinosId.toString(), name: 'Que demasiado', genres: [Song.INDIE] }),
            Song.create({ artist: bandalosChinosId.toString(), name: 'Dije tu nombre', genres: [Song.INDIE] }),
            Song.create({ artist: bandalosChinosId.toString(), name: 'La herida', genres: [Song.INDIE] })
        ])
    })

    it('succeeds on existing artists and songs and two matches', async () => {
        const result = await findSongs('la')

        expect(result).to.be.instanceOf(Array)
        expect(result).to.have.length(2)

        result.forEach(song => {
            expect(song._id).to.be.undefined
            expect(song.genres).to.be.undefined
            expect(song.album).to.be.undefined
            expect(song.date).to.be.undefined
            expect(song.interpretations).to.be.undefined
            expect(song.__v).to.be.undefined
            expect(song.id).to.exist
        })

        const songNames = ['La razón que te demora', 'La herida']

        songNames.forEach(songName => {
            const songIsIncluded = result.some(song => songName === song.name)

            expect(songIsIncluded).to.be.true
        })
    })

    it('succeeds on existing artists and songs and one match', async () => {
        const result = await findSongs('demasiado')

        expect(result).to.be.instanceOf(Array)
        expect(result).to.have.length(1)

        expect(result[0]._id).to.be.undefined
        expect(result[0].genres).to.be.undefined
        expect(result[0].album).to.be.undefined
        expect(result[0].date).to.be.undefined
        expect(result[0].interpretations).to.be.undefined
        expect(result[0].__v).to.be.undefined
        expect(result[0].id).to.exist
        expect(result[0].name).to.equal('Que demasiado')
    })

    it('succeeds on existing artists and songs, but no matches', async () => {
        const result = await findSongs('zZzZ')

        expect(result).to.be.instanceOf(Array)
        expect(result).to.have.length(0)
    })

    afterEach(() => {
        Artist.deleteMany()
        Song.deleteMany()
    })

    after(() => disconnect())
})