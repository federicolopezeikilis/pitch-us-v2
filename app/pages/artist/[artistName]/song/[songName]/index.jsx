import Link from 'next/link'
import Head from 'next/head'
import { verifyTokenAndRedirect } from '../../../../../helpers'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { ChevronLeftImage, SongIconImage, FavoriteImage, Footer, FlexColSection, InterpretationsList, Tag, ButtonBlue, Context } from '../../../../../components'
import { retrieveInterpretationsFromSong, retrieveUser } from '../../../../../logic'
import { stringToUrl } from '../../../../../utils'

export default function Song({ interpretations, user }) {
    const router = useRouter()

    const { handleFeedback } = useContext(Context)

    const [likedSong, setLikedSong] = useState(false)

    const artistName = interpretations[0].song.artist.name
    const songName = interpretations[0].song.name

    const handleOnNewInterpretationClick = () => {
        if (!user)
            handleFeedback('info', 'Login needed', 'You should log in to create an interpretation')
    }

    const onBackClick = () => router.back()

    const onFavoriteClick = () => likedSong === false ? setLikedSong(true) : setLikedSong(false)

    return <>
        <Head>
            <title>{songName} - chords and tabs - {artistName} | Pitch us</title>
        </Head>

        <header className="w-full bg-white p-4 gap-4 shadow-custom-items z-50">
            <div className="flex flex-col gap-4">
                <button className="w-8 h-8" onClick={onBackClick} >
                    <ChevronLeftImage />
                </button>
                <div className="flex flex-col justify-between gap-2">
                    <div className="flex gap-2">
                        <SongIconImage className="w-6 h-6" color="grey" />
                        <p className="text-secondarygrey font-bold text-xl">Song</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl text-myblack font-bold">{songName}</h1>
                        <FavoriteImage className="w-6 h-6 -mb-1" full={likedSong} onClick={onFavoriteClick} />
                    </div>
                </div>
                <Link href={`/artist/${stringToUrl(artistName)}`}>
                    <a className="w-fit">
                        <h2 className="text-secondarygrey">{artistName}</h2>
                    </a>
                </Link>
                <div className="flex gap-2 bg-white overflow-x-scroll scrollbar-hide">
                    <Tag active={true} >guitar</Tag>
                    <Tag>ukelele</Tag>
                    <Tag>bass</Tag>
                    <Tag>piano</Tag>
                    <Tag>trumpet</Tag>
                </div>
            </div>
        </header>

        <div className="flex-1 overflow-y-auto">
            <FlexColSection className="items-center">

                <div className="w-full h-14 px-4 bg-primary flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl text-myblack font-bold">Interpretations</h2>
                        <p className="text-xs text-mygrey">({interpretations.length})</p>
                    </div>
                    <Link href='/create-interpretation'>
                        <a>
                            <ButtonBlue onClick={handleOnNewInterpretationClick} >Add New</ButtonBlue>
                        </a>
                    </Link>
                </div>

                {interpretations.length > 0 &&
                    <InterpretationsList interpretations={interpretations} artistName={artistName} songName={songName} />
                }

                {interpretations.length === 0 && <p>There are not available interpretations for this song</p>}

            </FlexColSection>
        </div>

        <Footer user={user} />
    </>
}

export async function getServerSideProps({ params, req, res }) {
    const token = await verifyTokenAndRedirect(req, res)

    const interpretations = await retrieveInterpretationsFromSong(params.songName, params.artistName)

    if (token) {
        const user = await retrieveUser(token)

        return { props: { token, user, interpretations } }

    } else return { props: { interpretations } }
}

