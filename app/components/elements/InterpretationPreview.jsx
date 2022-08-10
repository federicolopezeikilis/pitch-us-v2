import { Header, FlexColSection, CircleChordButton, ChevronLeftImage, ChevronRightImage } from '../../components'
import { getChords, generateInterpretation } from '../../helpers'

export function InterpretationPreview({ className, content, onEditInterpretation, onSubmitInterpretation }) {
    return (
        <>
            <Header title="Preview" />

            <FlexColSection className="bg-primary flex-1 overflow-y-auto p-4">

                <div className="w-full py-4 flex flex-col gap-2">
                    <h2 className="flex items-center text-xl text-myblack font-bold">Chords</h2>
                    <div className="w-full flex flex-wrap gap-2">
                        {getChords(content).map(chord => {
                            return (
                                <CircleChordButton key={chord}>{chord}</CircleChordButton>
                            )
                        })}
                    </div>
                </div>

                <article className="w-full p-2 h-auto border border-inputBg bg-white overflow-y-scroll">
                    {generateInterpretation(content)}
                </article>

                <div className="mt-3 flex items-center justify-center">
                    <button
                        className="w-44 rounded-full bg-white py-4 flex justify-center items-center gap-4"
                        onClick={onEditInterpretation}
                    >
                        <ChevronLeftImage className="mt-0.5 w-6 h-6" color="blue" />
                        <p className="font-medium text-myblue">Edit</p>
                    </button>
                    <button
                        className="w-44 rounded-full bg-mygreen py-4 flex justify-center items-center gap-4"
                        onClick={onSubmitInterpretation}
                    >
                        <p className="font-medium text-white">Publish</p>
                        <ChevronRightImage className="mt-0.5 w-6 h-6" color="white" />
                    </button>
                </div>

            </FlexColSection>
        </>
    )
}

