import Image from 'next/image'

export const UserSessionImage = ({ className, pageOn, alt }) => {
    return (
        <figure className={`w-6 h-6 ${className}`}>
            <Image
            src={pageOn ? '/media/user-session-on.svg': '/media/user-session-off.svg'}
            height={20}
            width={20}
            alt={alt}
            />
        </figure>
    )
}