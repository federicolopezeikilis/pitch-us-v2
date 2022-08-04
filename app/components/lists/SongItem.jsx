import Link from 'next/link'
import { SongIconImage } from '../../components'

export const SongItem = ({ className, children, song, onClick, ...props }) => {
    const artistName = song.artist.name
    
    return (
        <li
        className={`w-full h-14 bg-primary shadow-custom-items ${className}`}
        onClick={onClick}
        {...props}>
            
            {!onClick ?
             <Link href={`/artist/${artistName.split(' ').join('-').toLowerCase()}/song/${song.name.split(' ').join('-').toLowerCase()}`}>
                <div className="w-full h-full px-4 flex gap-4 items-center">
                    <SongIconImage className="w-6 h-6" />
                    <div className="h-full w-full flex flex-col justify-center">
                        <div className="flex items-end gap-1">
                            <p className="leading-4 font-medium text-myblack" >{song.name}</p>
                            <p className="leading-4">·</p>
                            <p className="leading-4 text-myblack" >{artistName}</p>
                        </div>
                        <p className="w-full leading-4 text-sm font-medium text-placeholder" >Song</p>
                    </div>
                </div>
            </Link>
            :
            <div className="w-full h-full px-4 flex gap-4 items-center">
                    <SongIconImage className="w-6 h-6" />
                    <div className="h-full w-full flex flex-col justify-center">
                        <div className="flex items-end gap-1">
                            <p className="leading-4 font-medium text-myblack" >{song.name}</p>
                            <p className="leading-4">·</p>
                            <p className="leading-4 text-myblack" >{artistName}</p>
                        </div>
                        <p className="w-full leading-4 text-sm font-medium text-placeholder" >Song</p>
                    </div>
                </div>
            }

        </li>
    )
}