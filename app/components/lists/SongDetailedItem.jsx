import Link from 'next/link'
import { SongIconImage, ChevronDownImage } from '../../components'

export const SongDetailedItem = ({ className, children, song, ...props }) => {
    return (
        <li className={`w-full h-14 bg-primary shadow-custom-items ${className}`} {...props} key={song.id}>
            <ChevronDownImage className="w-6 h-6" />
            <Link href={`/artist/${song.artist.name.split(' ').join('-').toLowerCase()}/song/${song.name.split(' ').join('-').toLowerCase()}`}>
                <div className="w-full h-full px-4 flex gap-4 items-center">
                    
                    <SongIconImage className="w-6 h-6" />
                    
                    <div className="h-full w-full flex flex-col justify-center">
                        
                        <div className="flex items-end gap-1">
                            <p className="leading-4 font-medium text-myblack" >{song.name}</p>
                            <p className="leading-4">·</p>
                            <p className="leading-4 text-myblack" >{song.artist.name}</p>
                        </div>

                        <p className="w-full leading-4 text-sm font-medium text-placeholder" >Song</p>

                    </div>
                
                </div>
            </Link>
        </li>
    )
}