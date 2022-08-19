import Image from 'next/image'

export const UserSessionImage = ({ className, pageOn, alt }) => {
    return (
        <figure className={`w-8 h-8 ${className}`}>
            <Image
            src={pageOn ? '/media/user-session-on.svg': '/media/user-session-off.svg'}
            height={30}
            width={30}
            alt={alt}
            />
        </figure>
    )
}