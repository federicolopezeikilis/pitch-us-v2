const { connect, disconnect } = require('mongoose')
const { User, Artist, Song, Interpretation, Rank } = require('./models')
const { laRazonContent1, laRazonContent2, demasiadoContent1, sinSenalContent1, ojosAsiContent1, aTuLadoContent1, corasheContent, buenosAiresContent, businessWomanContent } = require('./populateSources')
const bcrypt = require('bcryptjs')

    ; (async () => {
        try {
            await connect('mongodb://localhost:27017/pitch-us')

            await Promise.all([
                User.deleteMany(),
                Artist.deleteMany(),
                Song.deleteMany(),
                Interpretation.deleteMany()
            ])

            /* CREATE USERS */
            const hash = await bcrypt.hash('Passw0rd', 10)

            const [userPepito, userWendy, userJohn, userRenguera, userFrank, userCharles, userPeter, userJuan, userMaria] = await Promise.all([
                User.create({ email: 'pepitogrillo@pitch-us.com', username: 'pepigri', password: hash }),
                User.create({ email: 'wendybread@pitch-us.com', username: 'wendy', password: hash }),
                User.create({ email: 'johndoed@pitch-us.com', username: 'john', password: hash }),
                User.create({ email: 'renguera79@gmail.com', username: 'renguera', password: hash }),
                User.create({ email: 'frank@gmail.com', username: 'frank', password: hash }),
                User.create({ email: 'charles@gmail.com', username: 'charles', password: hash }),
                User.create({ email: 'peter@gmail.com', username: 'peter', password: hash }),
                User.create({ email: 'juan@gmail.com', username: 'juan', password: hash }),
                User.create({ email: 'maria@gmail.com', username: 'maria', password: hash })
            ])

            /* ADD FOLLOWERS AND FOLLOWING */

            userPepito.following.push(userWendy._id, userJohn._id, userFrank._id, userPeter._id, userJuan._id)
            userWendy.following.push(userPepito._id, userJohn._id)

            userPepito.followers.push(userWendy._id)
            userWendy.followers.push(userPepito._id)
            userJohn.followers.push(userPepito._id, userWendy._id)
            userFrank.followers.push(userPepito._id)
            userPeter.followers.push(userPepito._id)
            userJuan.followers.push(userPepito._id)

            userPepito.save()
            userWendy.save()
            userJohn.save()
            userFrank.save()
            userPeter.save()
            userJuan.save()

            /* CREATE ARTISTS */

            const artistLaRenga = await Artist.create({ name: 'La Renga', genres: [Artist.ROCK], country: 'AR' })
            const artistBandalosChinos = await Artist.create({ name: 'Bandalos Chinos', genres: [Artist.ROCK], country: 'AR' })
            const artistShakira = await Artist.create({ name: 'Shakira', genres: [Artist.POP], country: 'CO' })
            const artistNathyPeluso = await Artist.create({ name: 'Nathy Peluso', genres: [Artist.POP, Artist.TRAP], country: 'AR' })
            // const artistPtazeta = await Artist.create({ name: 'Ptazeta', genres: [Artist.TRAP, Artist.HIP_HOP], country: 'ES' })
            // const artistDivididos = await Artist.create({ name: 'Divididos' })
            // const artistNickiNicole = await Artist.create({ name: 'Nicky Nicole' })
            // const artistQuevedo = await Artist.create({ name: 'Quevedo' })
            // const artistACDC = await Artist.create({ name: 'ACDC' })
            // const artistAitana = await Artist.create({ name: 'Aitana' })

            /* CREATE RANKS */

            const rank4FromPepito = new Rank({
                user: userPepito._id.toString(), amount: 4
            })

            const rank4fromWendy = new Rank({
                user: userWendy._id.toString(), amount: 4
            })

            const rank3FromWendy = new Rank({
                user: userWendy._id.toString(), amout: 3
            })

            const rank1FromJohn = new Rank({
                user: userJohn._id.toString(), amount: 1
            })

            /* CREATE SONGS */

            const songLaRazon = await Song.create({ artist: artistLaRenga._id.toString(), name: 'La razón que te demora', genres: [Song.ROCK] })
            const songATuLado = await Song.create({ artist: artistLaRenga._id.toString(), name: 'A tu lado', genres: [Song.ROCK] })
            // const songLaBalada = await Song.create({ artist: artistLaRenga._id.toString(), name: 'La balada del diablo y la muerte', genres: [Song.ROCK] })

            const songDemasiado = await Song.create({ artist: artistBandalosChinos._id.toString(), name: 'Demasiado', genres: [Song.INDIE] })
            // const songLosPuntos = await Song.create({ artist: artistBandalosChinos._id.toString(), name: 'Los Puntos', genres: [Song.INDIE] })
            // const songVamonosDeViaje = await Song.create({ artist: artistBandalosChinos._id.toString(), name: 'Vamonos de viaje', genres: [Song.INDIE] })
            const songSinSenal = await Song.create({ artist: artistBandalosChinos._id.toString(), name: 'Sin Señal', genres: [Song.INDIE] })


            const songOjosAsi = await Song.create({ artist: artistShakira._id.toString(), name: 'Ojos asi', genres: [Song.POP] })
            // const songCreo = await Song.create({ artist: artistShakira._id.toString(), name: 'Creo', genres: [Song.POP] })
            // const songCiegaSordomuda = await Song.create({ artist: artistShakira._id.toString(), name: 'Ciega sordomuda', genres: [Song.POP] })

            const songCorashe = await Song.create({ artist: artistNathyPeluso._id.toString(), name: 'Corashe', genres: [Song.TRAP] })
            const songBuenosAires = await Song.create({ artist: artistNathyPeluso._id.toString(), name: 'Buenos Aires', genres: [Song.POP] })
            const songBusinessWoman = await Song.create({ artist: artistNathyPeluso._id.toString(), name: 'Business Woman', genres: [Song.POP] })

            // const songCriminal = await Song.create({ artist: artistPtazeta._id.toString(), name: 'Criminal', genres: [Song.TRAP] })

            /* CREATE INTERPRETATIONS */

            const interpretationLaRazon1 = await Interpretation.create({
                user: userPepito._id.toString(), song: songLaRazon._id.toString(), content: laRazonContent1, ranks: [rank1FromJohn, rank4fromWendy]
            })

            const interpretationLaRazon2 = await Interpretation.create({
                user: userWendy._id.toString(), song: songLaRazon._id.toString(), content: laRazonContent2, ranks: [rank4FromPepito]
            })

            const interpretationATuLado1 = await Interpretation.create({
                user: userJohn._id.toString(), song: songATuLado._id.toString(), content: aTuLadoContent1, ranks: [rank4FromPepito]
            })

            const interpretationDemasiado1 = await Interpretation.create({
                user: userPepito._id.toString(), song: songDemasiado._id.toString(), content: demasiadoContent1
            })

            const interpretationSinSenal1 = await Interpretation.create({
                user: userPepito._id.toString(), song: songSinSenal._id.toString(), content: sinSenalContent1
            })

            const interpretationOjosAsi1 = await Interpretation.create({
                user: userJohn._id.toString(), song: songOjosAsi._id.toString(), content: ojosAsiContent1
            })

            const interpretationCorashe = await Interpretation.create({
                user: userPeter._id.toString(), song: songCorashe._id.toString(), content: corasheContent
            })

            const interpretationBuenosAires = await Interpretation.create({
                user: userPeter._id.toString(), song: songBuenosAires._id.toString(), content: buenosAiresContent
            })

            const interpretationBusinessWoman = await Interpretation.create({
                user: userFrank._id.toString(), song: songBusinessWoman._id.toString(), content: businessWomanContent
            })

            await disconnect()
        } catch (error) {
            console.error(error)
        }
    })()