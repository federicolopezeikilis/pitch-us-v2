import Image from 'next/image'

export const RateBlueImage = ({ className, children, full, ...props }) => {
    return (
        <figure className={`flex items-center justify-center ${className}`} {...props}>
            <Image src="/media/rate-blue.svg" height={13} width={14} />
        </figure>
    )
}