import Link from 'next/link'
import { calculateInterpretationRankAverage } from '../../helpers'
import { ChevronRightImage, RateWhiteImage } from '../images'
import { stringToUrl } from '../../utils'

export const InterpretationProfileItem = ({ className, interpretation, user }) => {
    const rankAverage = calculateInterpretationRankAverage(interpretation.ranks)

    return (
        <li className={`w-full border border-inputBg rounded-lg bg-white p-2 ${className || ''}`}>
            <Link href={`/artist/${stringToUrl(interpretation.song.artist.name)}/song/${stringToUrl(interpretation.song.name)}/interpretation/${interpretation.id}`}>
                <a className="flex justify-between items-center gap-2">
                    <div className="w-[58px] h-[52px] shrink-0 bg-myviolet rounded-[4px] px-2 flex justify-between items-center">
                        <RateWhiteImage className="w-4 h-4" />
                        <p className="font-medium text-white">{interpretation.ranks.length === 0 ? 'n/r' : rankAverage}</p>
                    </div>
                    <div className="w-full flex flex-col">
                        <h3 className="text-myblack font-medium">{interpretation.song.name}</h3>
                        <h4 className="text-myblack text-sm ">{interpretation.song.artist.name}</h4>
                    </div>
                    {user && <>
                        <div>
                            <p>·</p>
                        </div>
                        <div>
                            <h5 className="text-myblack">by {user.username}</h5>
                        </div>
                    </>}
                    <ChevronRightImage className="w-6 h-6" />
                </a>
            </Link>
        </li>
    )
}

