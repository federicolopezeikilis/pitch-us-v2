import Image from 'next/image'

export const HomeImage = ({ className, pageOn }) => {
    return (
        <figure className={`w-8 h-8 ${className || ''}`}>
            <Image
                src={pageOn ? '/media/home-on.svg' : '/media/home-off.svg'}
                height={30}
                width={30}
                alt="Home link"
            />
        </figure>
    )
}