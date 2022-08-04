import Image from 'next/image'

export const Logo = ({ className, ...props }) => {
    return (
        <figure className={`flex items-center justify-center ${className}`} {...props} >
            <Image src="/media/logo.png" width={200} height={200}>
            </Image>
        </figure>
    )
}