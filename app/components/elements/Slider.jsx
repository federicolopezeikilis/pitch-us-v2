import { CircleChordButton, CrossClose17Image } from '../../components'

export function Slider({ className, children, chord, onCloseChordClick, ...props }) {
    return (
        <div className={`fixed bottom-10 w-11/12 left-[4%] h-3/5 border border-inputBg rounded-3xl bg-white p-4 flex flex-col items-center gap-8 ${className}`} {...props}>
            <div className="w-full flex justify-between items-center">
                <CircleChordButton>{chord}</CircleChordButton>
                <button className="w-6 h-6"
                    onClick={onCloseChordClick}>
                    <CrossClose17Image />
                </button>
            </div>
            <p className="text-mygrey">Navigate between views for chord variants</p>
            <div className="w-full overflow-x-auto overflow-y-auto">
                {children}
            </div>
        </div>
    )
}

