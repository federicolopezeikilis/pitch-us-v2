import Link from 'next/link'
import { SongIconImage } from '../../components'
import { stringToUrl } from '../../utils'

export const SongItem = ({ className, song, onClick, page }) => {
    const artistName = song.artist.name

    return (
        <li
            className={`w-full h-14 bg-primary shadow-custom-items ${className}`}
            onClick={onClick}>

            {!onClick ?
                <Link href={`/artist/${stringToUrl(artistName)}/song/${stringToUrl(song.name)}`}>
                    <a className="w-full h-full px-4 flex gap-4 items-center">
                        <SongIconImage className="w-6 h-6" />
                        <div className="h-full w-full flex flex-col justify-center">
                            <div className="flex items-end gap-1">
                                {page === 'create-interpretation' ?
                                    <>
                                        <h3 className="leading-4 font-medium text-myblack" >{song.name}</h3>
                                        <p className="leading-4">·</p>
                                        <h4 className="leading-4 text-myblack" >{artistName}</h4>
                                    </>
                                    :
                                    <>
                                        <h2 className="leading-4 font-medium text-myblack" >{song.name}</h2>
                                        <p className="leading-4">·</p>
                                        <h3 className="leading-4 text-myblack" >{artistName}</h3>
                                    </>
                                }
                            </div>
                            <p className="w-full leading-4 text-sm font-medium text-placeholder" >Song</p>
                        </div>
                    </a>
                </Link>
                :
                <div className="w-full h-full px-4 flex gap-4 items-center">
                    <SongIconImage className="w-6 h-6" />
                    <div className="h-full w-full flex flex-col justify-center">
                        <div className="flex items-end gap-1">
                            {page === 'create-interpretation' ?
                                <>
                                    <h3 className="leading-4 font-medium text-myblack" >{song.name}</h3>
                                    <p className="leading-4">·</p>
                                    <h4 className="leading-4 text-myblack" >{artistName}</h4>
                                </>
                                :
                                <>
                                    <h2 className="leading-4 font-medium text-myblack" >{song.name}</h2>
                                    <p className="leading-4">·</p>
                                    <h3 className="leading-4 text-myblack" >{artistName}</h3>
                                </>
                            }
                        </div>
                        <p className="w-full leading-4 text-sm font-medium text-placeholder" >Song</p>
                    </div>
                </div>
            }

        </li>
    )
}