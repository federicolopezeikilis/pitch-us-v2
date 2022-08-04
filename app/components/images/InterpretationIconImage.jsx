import Image from 'next/image'

export const InterpretationIconImage = ({ className, children, color, ...props }) => {
    return (
        <figure className={`${className}`} {...props}>
            <Image 
            src={color === 'blue' ? "/media/interpretation-icon-blue.svg" :
            color === 'light-blue' ? "/media/interpretation-icon-light-blue.svg" :
            "/media/interpretation-icon.svg"}
            height={22} width={18} />
        </figure>
    )
}