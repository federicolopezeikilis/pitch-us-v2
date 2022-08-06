import { findArtistsSongsAndUsers, retrieveUser } from '../logic'
import { Header, Footer, SearchForm, FlexColSection } from '../components'
import { verifyTokenAndRedirect } from '../helpers'
import { useEffect, useState } from 'react'
import { ArtistsSongsAndUsersResultsList } from "../components"

export default function Search({ user }) {
    const [artistsSongsAndUsers, setArtistsSongsAndUsers] = useState(null)
    const [tag, setTag] = useState('all')
    const [queryState, setQueryState] = useState(null)

    const waiting = 0

    const onSearchSubmit = async event => {
        if (event)
            event.preventDefault()

        try {
            const artistsSongsAndUsersFounded = await findArtistsSongsAndUsers(queryState, tag)

            setArtistsSongsAndUsers(artistsSongsAndUsersFounded)
        } catch (error) {
            // TODO HANDLE FEEDBACK
        }
    }

    useEffect(() => {
        if (queryState) onSearchSubmit()
    }, [queryState, tag])

    const onChangeQueryTimeout = async (query, waitingPreviousValue) => {
        if (waitingPreviousValue === waiting) setQueryState(query)
    }

    const onChangeQuery = async event => {
        const query = event.target.value

        if (query.length > 2) {
            const waitingActualValue = waiting + 1

            waiting++

            setTimeout(function () {
                onChangeQueryTimeout(query, waitingActualValue)
            }, 500)

        } else {
            waiting++

            setArtistsSongsAndUsers(null)

            if (queryState !== null) setQueryState(null)
        }
    }

    const onCancelClick = () => setArtistsSongsAndUsers(null)

    const handleOnAllTagClick = () => setTag('all')

    const handleOnArtistsTagClick = () => setTag('artists')

    const handleOnSongsTagClick = () => setTag('songs')

    const handleOnUsersTagClick = () => setTag('users')

    return <div className="flex flex-col min-h-full">
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
    </div>
}


export async function getServerSideProps({ req, res }) {
    const token = await verifyTokenAndRedirect(req, res)

    if (token) {
        const user = await retrieveUser(token)

        return { props: { user } }

    } else return { props: {} }
}