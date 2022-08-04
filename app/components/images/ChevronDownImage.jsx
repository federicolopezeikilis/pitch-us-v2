import Image from 'next/image'

export const ChevronDownImage = ({ className, children, ...props }) => {
    return (
        <figure className={`flex items-center justify-center ${className}`} {...props}>
            <Image src="/media/chevron-down.svg" height={8.41} width={5.21} />
        </figure>
    )
}