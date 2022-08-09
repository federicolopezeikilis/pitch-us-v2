import Link from 'next/link'

export const ArtistSquareItem = ({ className, artist, index }) => {
    return (
        <li
            className={'w-[112px] h-28 rounded-lg ' +
                (index % 4 === 0 ? 'bg-gradient-orange' : index % 4 === 1 ? 'bg-gradient-purple' : index % 4 === 2 ? 'bg-gradient-yellow' : 'bg-gradient-green' + ` ${className}`)}
            key={index * 1000}>
            <Link href={`/artist/${artist.name.toLowerCase().replaceAll(' ', '-')}`}>
                <a className="w-full h-full p-2 flex items-end text-xl font-bold text-white">{artist.name}</a>
            </Link>
        </li>
    )
}