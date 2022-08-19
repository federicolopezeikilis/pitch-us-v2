import Image from 'next/image'

export const HomeImage = ({ className, pageOn }) => {
    return (
        <figure className={`w-6 h-6 ${className || ''}`}>
            <Image
                src={pageOn ? '/media/home-on.svg' : '/media/home-off.svg'}
                height={20}
                width={20}
                alt="Home link"
            />
        </figure>
    )
}