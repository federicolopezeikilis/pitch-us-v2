import Head from 'next/head'
import { withContext, Header, Footer, FlexColSection, ChevronRightImage, AuxiliarDivSearch, ArtistItem, SongItem, InterpretationPreview, CreateInterpretationPanel } from '../components'
import { verifyTokenAndRedirect } from '../helpers'
import { findArtists, retrieveSongsOfArtist, addInterpretationToSong, createSong, retrieveUser, createArtist } from '../logic'
import { useState } from 'react'
import { stringToUrl } from '../utils'
import { useRouter } from 'next/router'

export default withContext(function CreateInterpretation({ token, user, context: { tryThis } }) {
    const [artistState, setArtistState] = useState('active')
    const [queryArtist, setQueryArtist] = useState(null)
    const [artistsDisplayed, setArtistsDisplayed] = useState(null)
    const [artist, setArtist] = useState(null)

    const [songState, setSongState] = useState('inactive')
    const [songsOfArtist, setSongsOfArtist] = useState(null)
    const [songsDisplayed, setSongsDisplayed] = useState(null)
    const [song, setSong] = useState(null)

    const [preview, setPreview] = useState(false)
    const [interpretationContent, setInterpretationContent] = useState('')

    const router = useRouter()

    const handleChangeInputQueryArtist = async event => {
        const query = event.target.value

        if (query) {
            setQueryArtist(query)

            tryThis(async () => {
                const artists = await findArtists(query)

                if (artists.length === 0)
                    setArtistState('create')
                else if (artistState === 'create')
                    setArtistState('active')

                setArtistsDisplayed(artists)
            })

        } else {
            setQueryArtist(null)
            setArtistsDisplayed(null)

            if (artistState === 'create')
                setArtistState('active')
        }
    }

    const handleCreateArtist = event => handleChosenArtist({ name: event.target.input.value })

    const handleChosenArtist = async artistChosen => {
        setArtist(artistChosen)
        setArtistsDisplayed(null)
        setArtistState('chosen')

        if (artistChosen.id) {
            setSongState('active')

            tryThis(async () => {
                const songs = await retrieveSongsOfArtist(artistChosen.name)

                if (songs.length > 0) {
                    setSongsOfArtist(songs)
                    setSongsDisplayed(songs)
                }
            })
        } else
            setSongState('create')
    }

    const handleChangeArtist = () => {
        setArtist(null)
        setSongsOfArtist(null)
        setSongsDisplayed(null)
        setArtistState('active')
        setSongState('inactive')

        if (song) setSong(null)
    }

    const handleChangeInputQuerySong = event => {
        const query = event.target.value

        if (query) {
            if (songsOfArtist != null) {
                const songsFounded = songsOfArtist.filter(songOfArtist => songOfArtist.name.toLowerCase().includes(query.toLowerCase()))

                if (songsFounded.length === 0) {
                    setSongsDisplayed(null)
                    setSongState('create')
                } else {

                    setSongsDisplayed(songsFounded)

                    if (songState === 'create')
                        setSongState('active')
                }
            } else
                setSongsDisplayed(songsOfArtist)
        } else if (songState === 'create')
            setSongState('active')
    }

    const handleCreateSong = event => handleChosenSong({ name: event.target.input.value })

    const handleChosenSong = songChosen => {
        setSong(songChosen)
        setSongsDisplayed(null)
        setSongState('chosen')
    }

    const handleChangeSong = () => {
        setSong(null)
        setSongsDisplayed(songsOfArtist)
        setSongState('active')
    }

    const handleInterpretationPreview = event => {
        event.preventDefault()

        const content = event.target.textarea.value

        if (content.length < 200)
            handleFeedback('info', 'Interpretation shorter than required', 'Interpretation content should have at least 200 characters')

        else {
            setInterpretationContent(content)

            setPreview(true)
        }
    }

    const handleOnEditInterpretation = () => setPreview(false)

    const handleSubmitInterpretation = async () => {
        tryThis(async (handleFeedback) => {
            if (!artist.id) {

                artist.id = await createArtist(token, artist.name)
            }

            if (!song.id) {
                song.id = await createSong(token, { artist: artist.id, name: song.name })
            }

            const interpretationId = await addInterpretationToSong(token, song.id, interpretationContent)

            handleFeedback('success', 'Interpretation created!', 'Redirecting to your new interpretation')

            router.push(`/artist/${stringToUrl(artist.name)}/song/${stringToUrl(song.name)}/interpretation/${interpretationId}`)
        })
    }

    return (
        <>
            <Head>
                <title>Create your own interpretation of a song | PitchUs</title>
            </Head>

            {!preview ?
                <>
                    <Header title="Add New" />

                    <FlexColSection className="bg-primary flex-1 overflow-y-auto">

                        <CreateInterpretationPanel artist={artist} song={song} />

                        <AuxiliarDivSearch
                            state={artistState}
                            type="artist"
                            content={artist}
                            onInput={handleChangeInputQueryArtist}
                            onEditClick={handleChangeArtist}
                            onCreate={handleCreateArtist}
                            query={queryArtist}
                        />

                        {artistsDisplayed &&
                            <ul>{
                                artistsDisplayed.map(artist => {
                                    return <ArtistItem
                                        className="px-2"
                                        artist={artist}
                                        key={artist.id}
                                        page="create-interpretation"
                                        onClick={() => handleChosenArtist(artist)}
                                    />
                                })}
                            </ul>
                        }

                        <AuxiliarDivSearch
                            state={songState}
                            type="song"
                            content={song}
                            onInput={handleChangeInputQuerySong}
                            onEditClick={handleChangeSong}
                            onCreate={handleCreateSong}
                        />

                        {songsDisplayed &&
                            <ul>{
                                songsDisplayed.map(song => {
                                    return <SongItem
                                        className="px-2"
                                        song={song}
                                        key={song.id}
                                        page="create-interpretation"
                                        onClick={() => handleChosenSong(song)}
                                    />
                                })}
                            </ul>
                        }

                        {!song ?
                            <div className="mt-6 w-full px-4 gap-1">
                                <h2 className="font-medium text-placeholder">Interpretation</h2>
                                <div className="w-full h-80 border border-inputBg rounded bg-white">

                                </div>
                            </div>
                            :
                            <form
                                className="w-full px-4 gap-1"
                                onSubmit={handleInterpretationPreview}>

                                <h2 className="font-medium text-myblack">Write (or paste) here your interpretation</h2>
                                <textarea
                                    className="w-full h-80 border border-inputBg rounded p-2 bg-white focus:outline-none text-sm text-myblack"
                                    name="textarea"
                                    defaultValue={interpretationContent}
                                />

                                <div className="mt-3 flex items-center justify-center">
                                    <button className="w-44 rounded-full bg-mygreen py-4 flex justify-center items-center gap-4">
                                        <p className="font-medium text-white">Show Preview</p>
                                        <ChevronRightImage className="mt-0.5 w-6 h-6" color="white" />
                                    </button>
                                </div>
                            </form>
                        }

                    </FlexColSection>
                </>

                :

                <InterpretationPreview
                    content={interpretationContent}
                    onEditInterpretation={handleOnEditInterpretation}
                    onSubmitInterpretation={handleSubmitInterpretation}
                />

            }

            <Footer page="create-interpretation" user={user} />
        </>
    )
})

export async function getServerSideProps({ req, res }) {    
    const token = await verifyTokenAndRedirect(req, res)
  
    if (!token) return { props: {} }

    const user = await retrieveUser(token)

    return { props: { token, user } }
}