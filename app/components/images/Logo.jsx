import Image from 'next/image'

export const Logo = ({ className }) => {
    return (
        <figure className={`flex items-center justify-center ${className}`} >
            <Image
                src="/media/logo.png"
                width={166}
                height={166}
                alt="Pitch-us logo"
            />
        </figure>
    )
}