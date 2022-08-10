import Link from 'next/link'
import { ArtistIconImage } from '../../components'
import { stringToUrl } from '../../utils'

export const ArtistItem = ({ className, artist, onClick, page }) => {
    return (
        <li
            className={`w-full h-14 bg-primary shadow-custom-items ${className}`}
            onClick={onClick} >

            {!onClick ?
                <Link href={`/artist/${stringToUrl(artist.name)}`}>
                    <a className="w-full h-full px-4 flex gap-4 items-center">
                        <ArtistIconImage className="w-6 h-6" />
                        <div className="w-full">
                            {page === 'create-interpretation' ?
                                <h3 className="w-full leading-4 font-medium text-myblack" >{artist.name}</h3>
                                :
                                <h2 className="w-full leading-4 font-medium text-myblack" >{artist.name}</h2>
                            }
                            <p className="w-full leading-4 text-sm font-medium text-placeholder" >Artist</p>
                        </div>
                    </a>
                </Link>
                :
                <div className="w-full h-full px-4 flex gap-4 items-center">
                    <ArtistIconImage className="w-6 h-6" />
                    <div className="w-full">
                        {page === 'create-interpretation' ?
                            <h3 className="w-full leading-4 font-medium text-myblack" >{artist.name}</h3>
                            :
                            <h2 className="w-full leading-4 font-medium text-myblack" >{artist.name}</h2>
                        }
                        <p className="w-full leading-4 text-sm font-medium text-placeholder" >Artist</p>
                    </div>
                </div>
            }
        </li>
    )
}