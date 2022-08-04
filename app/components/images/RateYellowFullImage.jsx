import Image from 'next/image'

export const RateYellowFullImage = ({ className, children, pageOn, ...props }) => {
    return (
        <figure className={`flex items-center justify-center ${className}`} {...props}>
            <Image src="/media/rate-yellow-full.svg" height={30.09} width={31.29} />
        </figure>
    )
}