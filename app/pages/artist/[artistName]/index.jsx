import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ArtistIconImage, ArtistsSongsAndUsersResultsList, ChevronLeftImage, FavoriteImage, FlexColSection, Footer, ButtonBlue, Context } from '../../../components'
import { retrieveSongsOfArtist, retrieveUser } from '../../../logic'
import { useContext, useState } from 'react'
import { verifyTokenAndRedirect } from '../../../helpers'

export default function Artist({ songs, user }) {
    const router = useRouter()

    const { handleFeedback } = useContext(Context)

    const [likedArtist, setLikedArtist] = useState(false)

    const artist = songs[0].artist.name

    const handleOnNewSongClick = () => {
        if (!user)
            handleFeedback('info', 'Login needed', 'You should log in to create an interpretation')
    }

    const onBackClick = () => router.back()

    const onFavoriteClick = () => likedArtist === false ? setLikedArtist(true) : setLikedArtist(false)

    return <>
        <Head>
            <title>{artist} - chords from songs | Pitch us</title>
        </Head>

        <header className="w-full bg-white p-4 gap-4 shadow-custom-items">
            <div className="flex flex-col">
                <ChevronLeftImage className="w-8 h-8" onClick={onBackClick} />
                <div className="flex flex-col justify-between gap-2">
                    <div className="flex gap-2">
                        <ArtistIconImage className="w-6 h-6" color="grey" />
                        <p className="text-secondarygrey font-bold text-xl">Artist</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl text-myblack font-bold">{artist}</h1>
                        <FavoriteImage full={likedArtist} onClick={onFavoriteClick} className="w-6 h-6 -mb-1" />
                    </div>
                </div>
            </div>
        </header>

        <FlexColSection className="flex-1 overflow-y-auto items-center">
            <div className="w-full h-14 px-4 bg-primary flex items-center justify-between">
                <h3 className="text-xl text-myblack font-bold">Songs</h3>
                <Link href='/create-interpretation'>
                    <a>
                        <ButtonBlue onClick={handleOnNewSongClick}>Add New Song</ButtonBlue>
                    </a>
                </Link>
            </div>
            <ArtistsSongsAndUsersResultsList songs={songs} />
        </FlexColSection>
        <Footer user={user} />
    </>
}

export async function getServerSideProps({ params, req, res }) {
    const token = await verifyTokenAndRedirect(req, res)

    const songs = await retrieveSongsOfArtist(params.artistName)

    if (token) {
        const user = await retrieveUser(token)

        return { props: { songs, user } }

    } else return { props: { songs } }
}