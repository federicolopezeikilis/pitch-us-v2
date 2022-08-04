import { ArtistItem, SongItem, UserItem } from '../../components'

export const ArtistsSongsAndUsersResultsList = ({ className, children, results, songs, ...props }) => {
    return (
        <ul className={`w-full bg-primary flex flex-col list-none shadow-custom-items ${className}`} {...props}>{children}

            {results && results.artists &&
                results.artists.map(artist => <ArtistItem artist={artist} key={artist.id} />)
            }

            {results && results.songs &&
                results.songs.map(song => <SongItem key={song.id} song={song} showArtist={true} />)
            }

            {results && results.users &&
                results.users.map(user => <UserItem key={user.id} user={user} />)
            }

            {songs &&
                songs.map(song => <SongItem key={song.id} song={song} />)
            }
        </ul>
    )
}
