import Image from 'next/image'

export const RateYellowImage = ({ className, children, full, ...props }) => {
    return (
        <figure className={`flex items-center justify-center ${className}`} {...props}>
            <Image src={full ? "/media/rate-yellow-full-small.svg": "/media/rate-yellow-empty.svg"} height={18.05} width={18.78} />
        </figure>
    )
}