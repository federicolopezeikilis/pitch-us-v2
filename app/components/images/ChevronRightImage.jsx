import Image from 'next/image'

export const ChevronRightImage = ({ className, children, color, ...props }) => {
    return (
        <figure className={`flex items-center justify-center ${className}`} {...props}>
            <Image
                src={color === 'white' ?
                    '/media/chevron-right-white.svg' :
                    '/media/chevron-right.svg'}
                height={8.41} width={5.21} />
        </figure>
    )
}