import Link from 'next/link'
import { DialogButton1 } from '../buttons';
const querystring = require('query-string');

export const SpotifyAnchor = ({ className, children, ...props }) => {
    const state = Math.random() * 10000;
    const scope = 'user-read-private user-read-email user-top-read user-read-recently-played user-read-playback-position playlist-read-collaborative user-read-playback-state user-follow-read user-read-currently-playing user-library-read playlist-read-private'

    return (
        <Link href={`https://accounts.spotify.com/authorize?${querystring.stringify({
            response_type: 'code',
            client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
            scope: scope,
            redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
            state: state
        })}`} >
            <a className="w-full p-4 rounded-full bg-mygreen text-white flex justify-center items-center">
                {children}
            </a >
        </Link>
    )
}

