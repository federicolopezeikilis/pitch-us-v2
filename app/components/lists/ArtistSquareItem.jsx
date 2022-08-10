import Link from 'next/link'
import { stringToUrl } from '../../utils'

export const ArtistSquareItem = ({ className, artist, index }) => {
    return (
        <li className={'w-[112px] min-w-[112px] h-28 rounded-lg ' + (index % 4 === 0 ? 'bg-gradient-orange' : index % 4 === 1 ? 'bg-gradient-purple' : index % 4 === 2 ? 'bg-gradient-yellow' : 'bg-gradient-green' + ` ${className}`)}>
            <Link href={`/artist/${stringToUrl(artist.name)}`}>
                <a className="w-full h-full p-2 flex items-end text-xl font-bold text-white">
                    <h3>{artist.name}</h3>
                </a>
            </Link>
        </li>
    )
}