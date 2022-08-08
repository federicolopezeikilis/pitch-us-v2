import Link from 'next/link'
import { calculateInterpretationRankAverage } from '../../helpers'
import { ChevronRightImage, RateWhiteImage } from '../images'

export const InterpretationProfileItem = ({ className, children, interpretation, user, ...props }) => {
    const rankAverage = calculateInterpretationRankAverage(interpretation.ranks)

    return (
        <li className="w-full border border-inputBg rounded-lg bg-white p-2">
            <Link href={`/artist/${interpretation.song.artist.name.toLowerCase().replaceAll(' ', '-')}/song/${interpretation.song.name.toLowerCase().replaceAll(' ', '-')}/interpretation/${interpretation.id}`}>
                <a className="flex justify-between items-center gap-2">
                    <div className="w-[58px] h-[52px] shrink-0 bg-myviolet rounded-[4px] px-2 flex justify-between items-center">
                        <RateWhiteImage className="w-4 h-4" />
                        <p className="font-medium text-white">{interpretation.ranks.length === 0 ? 'n/r' : rankAverage}</p>
                    </div>
                    <div className="w-full flex flex-col">
                        <p className="text-myblack">{interpretation.song.name}</p>
                        <p className="text-sm font-medium text-myblack">{interpretation.song.artist.name}</p>
                    </div>
                    {user && <>
                        <div>
                            <p>·</p>
                        </div>
                        <div>
                            <p className="text-myblack">by {user.username}</p>
                        </div>
                    </>}
                    <ChevronRightImage className="w-6 h-6" />
                </a>
            </Link>
        </li>
    )
}

