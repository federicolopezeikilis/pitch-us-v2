import Link from 'next/link'
import { useState } from "react"
import { CrossGreyImage, Interpretation, Slider, ChordImages } from '../../../../../../../components'
import { retrieveInterpretationFromSong } from '../../../../../../../logic'

export default function FullScreenInterpretation({ interpretation }) {
    const [chordView, setChordView] = useState(null)

    const songName = interpretation.song.name
    const artistName = interpretation.song.artist.name

    const handleChordClick = chord => setChordView(chord)

    const onCloseChordClick = () => setChordView(null)

    return (
        <>
            <div className={`flex flex-col justify-center gap-2 bg-primary h-full m-0 p-4` + (chordView ? ' brightness-50' : '')}>
                <header className="flex justify-between shrink-0">
                    <h1 className="font-bold text-xl text-mygrey">{songName}</h1>
                    <Link href={`/artist/${artistName.split(' ').join('-').toLowerCase()}/song/${songName.split(' ').join('-').toLowerCase()}/interpretation/${interpretation.id}`}>
                        <a>
                            <CrossGreyImage className="w-8 h-8 flex justify-center align-center" />
                        </a>
                    </Link>
                </header>
                <main className="h-full m-0 border border-inputBg bg-white p-2 flex-1 overflow-auto">
                    <Interpretation content={interpretation.content} onChordClick={handleChordClick} />
                </main>
            </div>

            {chordView &&
                <Slider chord={chordView} onCloseChordClick={onCloseChordClick} >
                    <ChordImages chord={chordView} />
                </Slider>}
        </>
    )
}

export async function getServerSideProps({ params: { songName, artistName, interpretationId } }) {
    const interpretation = await retrieveInterpretationFromSong(songName, artistName, interpretationId)

    return { props: { interpretation } }
}