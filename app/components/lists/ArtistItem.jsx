import Link from 'next/link'
import { ArtistIconImage } from '../../components'

export const ArtistItem = ({ className, children, artist, onClick, ...props }) => {
    return (
        <li 
        className={`w-full h-14 bg-primary shadow-custom-items ${className}`}
        onClick={onClick} 
        {...props} >
            
            {!onClick ?
                <Link href={`/artist/${artist.name.split(' ').join('-').toLowerCase()}`}>
                    <div className="w-full h-full px-4 flex gap-4 items-center">
                        <ArtistIconImage className="w-6 h-6" />
                        <div className="w-full">
                            <p className="w-full leading-4 font-medium text-myblack" >{artist.name}</p>
                            <p className="w-full leading-4 text-sm font-medium text-placeholder" >Artist</p>
                        </div>
                    </div>
                </Link>
                :
                <div className="w-full h-full px-4 flex gap-4 items-center">
                    <ArtistIconImage className="w-6 h-6" />
                    <div className="w-full">
                        <p className="w-full leading-4 font-medium text-myblack" >{artist.name}</p>
                        <p className="w-full leading-4 text-sm font-medium text-placeholder" >Artist</p>
                    </div>
                </div>
            }
        </li>
    )
}