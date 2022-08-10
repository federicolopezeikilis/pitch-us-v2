import Link from 'next/link'
import { calculateInterpretationRankAverage } from '../../helpers'
import { RankImage } from '../images'

export const InterpretationItem = ({ className, children, interpretation, artistName, songName, ...props }) => {
    const rankAverage = calculateInterpretationRankAverage(interpretation.ranks)

    return (
        <li className={`w-full h-14 bg-primary shadow-custom-items ${className}`} {...props} >
            <Link
                href={`/artist/${artistName.split(' ').join('-').toLowerCase()}/song/${songName.split(' ').join('-').toLowerCase()}/interpretation/${interpretation.id}`} >
                <a className="w-full h-full px-4 grid grid-cols-[1fr_68px_50px]">
                    <h4 className="text-mygrey flex items-center">{interpretation.user.username}</h4>
                    <div className="pl-2 flex items-center justify-start gap-1">
                        <RankImage className="w-6 h-6 flex items-center justify-center" />
                        <p className="font-medium text-mygrey">{rankAverage ? rankAverage : 'NotRanked'}</p>
                    </div>
                    <p className="text-xs text-mygrey flex items-center justify-end">({interpretation.ranks.length})</p>
                </a>
            </Link>
        </li>
    )
}

