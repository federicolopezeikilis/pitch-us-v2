import { InterpretationItem, ChevronUpImage } from '../../components'

export const InterpretationsList = ({ className, children, interpretations, artistName, songName, ...props }) => {
    return (
        <ul className={`m-0 w-full flex flex-col list-none ${className}`} {...props}>{children}
            <div className="w-full h-14 px-4 bg-primary grid grid-cols-[1fr_68px_50px]" key="ul-title">
                <p className="text-xs text-mygrey font-bold flex items-center">USER</p>
                <div className="pr-3 flex items-center">
                    <ChevronUpImage className="w-6 h-6" />
                    <p className="text-xs text-mygrey font-bold">RANK</p>
                </div>
                <p className="flex items-center text-xs text-mygrey font-bold">REVIEWS</p>
            </div>

            {interpretations.length > 0 && interpretations.map(interpretation => {
                return <InterpretationItem interpretation={interpretation} key={interpretation.id} artistName={artistName} songName={songName} />
            })
            }
        </ul>
    )
}
