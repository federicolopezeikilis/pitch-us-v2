import { useState } from "react"
import { EyePasswordImage } from "../../images"

export const PasswordInput = ({ className, children, ...props }) => {
    const [passwordShown, setPasswordShow] = useState(false)

    const turnOffPasswordShow = () => {
        setPasswordShow(false)
    }

    const onEyePasswordMouseDown = () => {
        setPasswordShow(true)
        
        setTimeout(
            turnOffPasswordShow,
            1000
        )
    }

    return (
        <div className="w-full flex">
            <input {...props}
                className={`h-10 w-full py-3 px-4 rounded-lg border border-inputBorder bg-inputBg placeholder-placeholder text-sm text-mygrey ${className}`}
                type={passwordShown ? 'text' : 'password'}
            >
                {children}
            </input>

            <EyePasswordImage className="-ml-8" onMouseDown={onEyePasswordMouseDown} />
        </div>
    )
}