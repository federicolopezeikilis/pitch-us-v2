import Image from 'next/image'

export const CrossImage = ({ className, children, ...props }) => {
    return (
        <figure className={`flex items-center justify-center ${className}`} {...props}>
            <Image src="/media/cross.svg" height={13.06} width={13.06} />
        </figure>
    )
}