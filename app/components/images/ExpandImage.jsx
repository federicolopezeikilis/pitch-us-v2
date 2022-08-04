import Image from 'next/image'

export const ExpandImage = ({ className, children, ...props }) => {
    return (
        <figure className={`flex items-center justify-center ${className}`} {...props}>
            <Image src="/media/arrow-up-right.svg" height={16.74} width={21.86} />
        </figure>
    )
}