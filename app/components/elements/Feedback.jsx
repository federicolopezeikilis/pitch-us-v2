import { FeedbackImage, CrossImage } from "../images"

export function Feedback({ level, title, description, onTimeout, onCloseClick }) {
    if (level !== 'error') {
        setTimeout(onTimeout, 3000)
    }

    const onCloseImageClick = () => {
        onCloseClick()
    }

    return <div className="fixed bottom-24 w-full px-4" >

        <div className={"border-2 p-4 rounded-3xl flex gap-4 " +

            (level === 'info' ? "border-myblue bg-purpleBg" :
                level === 'success' ? "border-mygreen bg-mygreenLight" :
                    level === 'warning' ? "border-myorange bg-myorangeLight" : "border-mymagenta bg-mymagentaLight")
        } >

            <FeedbackImage className="w-6 h-6" level={level} />

            <div className="w-full flex flex-col">
                <h5 className="font-bold text-myblack">{title}</h5>
                <p className="text-myblack">{description}</p>
            </div>

            <button
                className={"w-6 h-6" + (level !== 'error' ? ' hidden' : '')}
                onClick={onCloseImageClick}>
                
                <CrossImage className="w-6 h-6" />
            
            </button>
        </div>
    </div>
}