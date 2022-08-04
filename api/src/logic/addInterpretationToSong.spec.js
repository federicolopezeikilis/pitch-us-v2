const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { User, Artist, Song, Interpretation } = require('../models')
const { NotFoundError, FormatError } = require('errors')
const { addInterpretationToSong } = require('.')
const { expect } = require('chai')
const { validateObjectId } = require('../validators')

describe('addInterpretationToSong', () => {

    before(() => connect('mongodb://localhost:27017/pitch-us-test'))

    beforeEach(async () => {
        await Song.deleteMany()
        await Artist.deleteMany()
        await User.deleteMany()
        await Interpretation.deleteMany()
    })

    it('fails on unexisting user', async () => {
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

        const wrongUserId = new ObjectId().toString()
        const wrongSongId = new ObjectId().toString()

        try {
            const result = await addInterpretationToSong(wrongUserId, wrongSongId, content)

            throw new Error('it should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceof(NotFoundError)
            expect(error.message).to.equal(`user with id ${wrongUserId} not found`)
        }
    })

    describe('on existing user', () => {
        let user

        beforeEach(async () => {
            user = await User.create({ username: 'wendypan', email: 'wendypan@gmail.com', password: 'Passw0rd' })
        })


        it('fails on unexisting song', async () => {
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

            const wrongSongId = new ObjectId().toString()

            try {
                await addInterpretationToSong(user._id.toString(), wrongSongId, content)

                throw new Error('it should not reach this point')
            } catch (error) {
                expect(error).to.be.instanceof(NotFoundError)
                expect(error.message).to.equal(`song with id ${wrongSongId} not found`)
            }
        })

        describe('on existing artist and song', () => {
            let artist, song

            beforeEach(async () => {
                artist = await Artist.create({ name: 'La Renga', genres: [Artist.ROCK], country: 'AR' })

                song = await Song.create({ artist: artist._id.toString(), name: 'A tu lado', genres: [Song.ROCK], album: 'Detonador de sueños', date: new Date(2003, 0) })
            })

            it('succeeds on existing user, artist and song', async () => {
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

                const result = await addInterpretationToSong(user._id.toString(), song._id.toString(), content)

                validateObjectId(result)

                const savedInterpretation = await Interpretation.findById(result)

                expect(savedInterpretation.user.toString()).to.equal(user._id.toString())
                expect(savedInterpretation.song.toString()).to.equal(song._id.toString())
                expect(savedInterpretation.content).to.equal(content)
            })

            it('fails on content with less than 200 characters', async () => {
                const content = `E5
                Pobreza en los estómagos`

                try {
                    const result = await addInterpretationToSong(user._id.toString(), song._id.toString(), content)

                } catch (error) {
                    expect(error).to.be.instanceof(FormatError)
                    expect(error.message).to.equal('interpretation content has less than 200 characters')
                }
            })
        })
    })
    afterEach(async () => {
        await Song.deleteMany()
        await Artist.deleteMany()
        await User.deleteMany()
        await Interpretation.deleteMany()
    })

    after(() => disconnect())
})