import { AuxiliarDiv } from '../../components'

export const CreateInterpretationPanel = ({ artist, song }) => {
    return (
        <div className="w-full p-4 flex gap-2">
            {
                !artist ?
                    <>
                        <AuxiliarDiv color="blue" type="artist" />
                        <AuxiliarDiv color="light-blue" type="song" />
                        <AuxiliarDiv color="light-blue" type="interpretation" />
                    </>
                    :
                    !song ?
                        <>
                            <AuxiliarDiv color="white" type="artist" />
                            <AuxiliarDiv color="blue" type="song" />
                            <AuxiliarDiv color="light-blue" type="interpretation" />
                        </>
                        :
                        <>
                            <AuxiliarDiv color="white" type="artist" />
                            <AuxiliarDiv color="white" type="song" />
                            <AuxiliarDiv color="blue" type="interpretation" />
                        </>
            }
        </div>
    )
}
