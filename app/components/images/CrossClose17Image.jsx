import Image from 'next/image'

export const CrossClose17Image = ({ className, children, ...props }) => {
    return (
        <figure className={`flex items-center justify-center ${className}`} {...props}>
            <Image src="/media/cross.svg" height={17.41} width={17.41} />
        </figure>
    )
}