import Head from 'next/head'
import { findArtistsSongsAndUsers, retrieveUser } from '../logic'
import { withContext, Header, Footer, SearchForm, FlexColSection, ArtistsSongsAndUsersResultsList } from '../components'
import { verifyTokenAndRedirect } from '../helpers'
import { useEffect, useState } from 'react'

export default withContext(function Search({ user, context: { tryThis } }) {
    const [artistsSongsAndUsers, setArtistsSongsAndUsers] = useState(null)
    const [tag, setTag] = useState('all')
    const [queryState, setQueryState] = useState(null)

    let timeoutID

    const onSearchSubmit = async query => {
        tryThis(async () => {
            const artistsSongsAndUsersFounded = await findArtistsSongsAndUsers(query, tag)

            setArtistsSongsAndUsers(artistsSongsAndUsersFounded)
        }, (error, handleFeedback) => {
            handleFeedback('error', 'Search error', error.message)
        })
    }

    useEffect(() => {
        if (queryState) onSearchSubmit(queryState)
    }, [tag])

    const onChangeQuery = async event => {
        const query = event.target.value

        if (query.length > 2) {
            if (timeoutID)
                clearTimeout(timeoutID)

            timeoutID = setTimeout(() => onSearchSubmit(query), 500)

            setQueryState(query)
        } else {
            setArtistsSongsAndUsers(null)

            setQueryState(null)
        }
    }

    const onCancelClick = () => setArtistsSongsAndUsers(null)

    const handleOnAllTagClick = () => setTag('all')

    const handleOnArtistsTagClick = () => setTag('artists')

    const handleOnSongsTagClick = () => setTag('songs')

    const handleOnUsersTagClick = () => setTag('users')

    return <>
        <Head>
            <title>Search chords and tab from artists and songs | PitchUs</title>
        </Head>

        <Header className="pb-2" title="Search" />

        <FlexColSection className="py-4 flex-1 overflow-y-auto items-center gap-4" >
            <SearchForm className="px-4" tag={tag}
                onChangeInput={onChangeQuery}
                onCancelClick={onCancelClick}
                onAllTagClick={handleOnAllTagClick}
                onArtistsTagClick={handleOnArtistsTagClick}
                onSongsTagClick={handleOnSongsTagClick}
                onUsersTagClick={handleOnUsersTagClick} />

            {artistsSongsAndUsers &&
                <ArtistsSongsAndUsersResultsList
                    results={tag === 'all' ? artistsSongsAndUsers
                        : tag === 'artists' ? { artists: artistsSongsAndUsers.artists }
                            : tag === 'songs' ? { songs: artistsSongsAndUsers.songs }
                                : { users: artistsSongsAndUsers.users }}
                />}

        </FlexColSection>

        <Footer user={user} page="search" ></Footer>
    </>
})


export async function getServerSideProps({ req, res }) {
    const token = await verifyTokenAndRedirect(req, res)

    if (token) {
        const user = await retrieveUser(token)

        return { props: { user } }

    } else return { props: {} }
}