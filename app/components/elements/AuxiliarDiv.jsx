import { ArtistIconImage, SongIconImage, InterpretationIconImage } from "../../components"

export function AuxiliarDiv({ className, children, color, type, ...props }) {
    return (
        <div className={"min-w-fit rounded-3xl px-4 py-2 flex gap-2 justify-center items-center " + (color === "white" ? "bg-myblue" : color === "blue" ? "border-2 border-myblue bg-white" : "bg-white" )}>
            {
            type === "artist" ? <ArtistIconImage color={color} /> :
            type === "song" ? <SongIconImage color={color} /> : 
            <InterpretationIconImage color={color} />
            }
            <p className={color === "white" ? "text-white" : color === "blue" ? "text-myblue font-bold" : "text-[#99CBD8]"} >{type === "artist" ? "Artist" : type === "song" ? "Song" : "Interpretation"}</p>
        </div>
    )
}