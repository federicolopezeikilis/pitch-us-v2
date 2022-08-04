import Image from 'next/image'

export const HomeImage = ({ className, children, pageOn, ...props }) => {
    return (
        <figure className={`w-10 h-10 ${className}`} {...props}>
            <Image src={pageOn ? '/media/home-on.svg': '/media/home-off.svg'} height={40} width={40} />
        </figure>
    )
}