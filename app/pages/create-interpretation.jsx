import { Header, Footer, FlexColSection, ChevronRightImage, ChevronLeftImage, CircleChordButton, AuxiliarDiv, AuxiliarDivSearch, ArtistItem, SongItem, Context } from '../components'
import { verifyTokenAndRedirect, getChords, generateInterpretation } from '../helpers'
import { findArtists, retrieveSongsOfArtist, addInterpretationToSong, createSong, retrieveUser, createArtist } from '../logic'
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'

export default function CreateInterpretation({ token, user }) {
    const [artistState, setArtistState] = useState('active')
    const [queryArtist, setQueryArtist] = useState(null)
    const [artistsDisplayed, setArtistsDisplayed] = useState(null)
    const [artist, setArtist] = useState(null)

    const [songState, setSongState] = useState('inactive')
    const [querySong, setQuerySong] = useState(null)
    const [songsOfArtist, setSongsOfArtist] = useState(null)
    const [songsDisplayed, setSongsDisplayed] = useState(null)
    const [song, setSong] = useState(null)

    const [preview, setPreview] = useState(false)
    const [interpretationContent, setInterpretationContent] = useState('')

    const router = useRouter()

    const { handleFeedback } = useContext(Context)

    const onChangeQueryArtist = async event => {
        const query = event.target.value

        if (query) {
            setQueryArtist(query)

            try {
                const artists = await findArtists(query)

                if (artists.length === 0)
                    setArtistState('create')
                else if (artistState === 'create')
                    setArtistState('active')

                setArtistsDisplayed(artists)
            } catch (error) {
                handleFeedback('error', 'Error', error.message)
            }

        } else {
            setQueryArtist(false)
            setArtistsDisplayed(null)
        }
    }

    const onClickCreateArtist = event => {

        event.preventDefault()

        const artistName = event.target.input.value

        setArtist({ name: artistName })
        setArtistsDisplayed(null)
        setArtistState('intermediate')
        setSongState('create')
    }

    const onClickArtist = async artistChosen => {
        setArtist(artistChosen)
        setArtistsDisplayed(null)
        setArtistState('intermediate')
        setSongState('active')

        try {
            const songs = await retrieveSongsOfArtist(artistChosen.name)

            if (songs.length > 0) {
                setSongsOfArtist(songs)
                setSongsDisplayed(songs)
            }
        } catch (error) {
            handleFeedback('error', 'Error', error.message)
        }
    }

    const onClickChangeArtist = () => {
        setArtist(null)
        setSongsOfArtist(null)
        setSongsDisplayed(null)
        setArtistState('active')
        setSongState('inactive')

        if (song) setSong(null)
    }

    const onClickCreateSong = event => {
        event.preventDefault()

        setSong({ name: event.target.input.value })
        setSongsDisplayed(null)
        setSongState('intermediate')
    }

    const onChangeQuerySong = async event => {
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
        }
    }

    const onClickSong = async songChosen => {
        setSong(songChosen)
        setSongsDisplayed(null)
        setSongState('intermediate')
    }

    const onClickChangeSong = () => {
        setSong(null)
        setSongsDisplayed(songsOfArtist)
        setSongState('active')
    }

    const onPreviewInterpretation = async event => {
        event.preventDefault()

        const content = event.target.textarea.value

        if (content.length < 200) {
            handleFeedback('info', 'Interpretation shorter than required', 'Interpretation content should have at least 200 characters')

            return
        }

        setInterpretationContent(content)

        setPreview(true)
    }

    const onEditInterpretation = async () => setPreview(false)

    const onSubmitInterpretation = async event => {

        event.preventDefault()

        try {
            if (!artist.id) {

                artist.id = await createArtist(token, artist.name)
            }

            if (!song.id) {
                song.id = await createSong(token, { artist: artist.id, name: song.name })
            }

            const interpretationId = await addInterpretationToSong(token, song.id, interpretationContent)

            handleFeedback('success', 'Interpretation created!', 'Redirecting to your new interpretation')

            router.push(`/artist/${artist.name.split(' ').join('-')}/song/${song.name.split(' ').join('-')}/interpretation/${interpretationId}`)
        } catch (error) {
            handleFeedback('error', 'Error', error.message)
        }
    }

    return (
        <div className="flex flex-col h-[-webkit-fill-available]">
            {!preview ? <><Header title="Add New" />
                <FlexColSection className="bg-primary flex-1 overflow-y-auto">

                    <div className="w-full p-4 flex gap-2">
                        {
                            !artist ?
                                <>
                                    <AuxiliarDiv color="blue" type="artist" />
                                    <AuxiliarDiv color="light-blue" type="song" />
                                    <AuxiliarDiv color="light-blue" type="interpretation" />
                                </>
                                :
                                !song ?
                                    <>
                                        <AuxiliarDiv color="white" type="artist" />
                                        <AuxiliarDiv color="blue" type="song" />
                                        <AuxiliarDiv color="light-blue" type="interpretation" />
                                    </>
                                    :
                                    <>
                                        <AuxiliarDiv color="white" type="artist" />
                                        <AuxiliarDiv color="white" type="song" />
                                        <AuxiliarDiv color="blue" type="interpretation" />
                                    </>
                        }
                    </div>

                    <AuxiliarDivSearch
                        state={artistState}
                        type="artist"
                        content={artist}
                        onChange={onChangeQueryArtist}
                        onEditClick={onClickChangeArtist}
                        onCreate={onClickCreateArtist}
                        query={queryArtist}
                    />

                    {artistsDisplayed && <ul>{
                        artistsDisplayed.map(artist => {
                            return <ArtistItem
                                className="px-2"
                                artist={artist}
                                key={artist.id}
                                onClick={function () {
                                    onClickArtist(artist)
                                }} />
                        })}
                    </ul>
                    }

                    <AuxiliarDivSearch
                        state={songState}
                        type="song"
                        content={song}
                        onChange={onChangeQuerySong}
                        onEditClick={onClickChangeSong}
                        onCreate={onClickCreateSong}
                        query={querySong}
                    />

                    {songsDisplayed && <ul>{
                        songsDisplayed.map(song => {
                            return <SongItem
                                className="px-2"
                                song={song}
                                key={song.id}
                                onClick={function () {
                                    onClickSong(song)
                                }}
                            />
                        })}
                    </ul>
                    }


                    {!song ?
                        <div className="mt-6 w-full px-4 gap-1">
                            <h3 className="font-medium text-placeholder">Interpretation</h3>
                            <div className="w-full h-80 border border-inputBg rounded bg-white">

                            </div>
                        </div>
                        :
                        <form
                            className="w-full px-4 gap-1"
                            onSubmit={onPreviewInterpretation}>

                            <h3 className="font-medium text-myblack">Write (or paste) here your interpretation</h3>
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

                <>
                    <Header title="Preview" />
                    <FlexColSection className="bg-primary flex-1 overflow-y-auto p-4">

                        <div className="w-full py-4 flex flex-col gap-2">
                            <h3 className="flex items-center text-xl text-myblack font-bold">Chords</h3>
                            <div className="w-full flex flex-wrap gap-2">
                                {getChords(interpretationContent).map((chord, index) => {
                                    return (
                                        <CircleChordButton key={index * 10}>{chord}</CircleChordButton>
                                    )
                                })}
                            </div>
                        </div>

                        <article className="w-full p-2 h-auto border border-inputBg bg-white overflow-y-scroll">

                            {generateInterpretation(interpretationContent)}

                        </article>

                        <div className="mt-3 flex items-center justify-center">
                            <button
                                className="w-44 rounded-full bg-white py-4 flex justify-center items-center gap-4"
                                onClick={onEditInterpretation}>

                                <ChevronLeftImage className="mt-0.5 w-6 h-6" color="blue" />
                                <p className="font-medium text-myblue">Edit</p>

                            </button>

                            <button
                                className="w-44 rounded-full bg-mygreen py-4 flex justify-center items-center gap-4"
                                onClick={onSubmitInterpretation}>

                                <p className="font-medium text-white">Publish</p>
                                <ChevronRightImage className="mt-0.5 w-6 h-6" color="white" />

                            </button>
                        </div>

                    </FlexColSection>
                </>
            }

            <Footer page="create-interpretation" user={user} />
        </div>
    )
}

export async function getServerSideProps({ req, res }) {
    const token = await verifyTokenAndRedirect(req, res)

    if (!token) return { props: {} }

    const user = await retrieveUser(token)

    return { props: { token, user } }
}