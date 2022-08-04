import Image from 'next/image'

export const CrossGreyImage = ({ className, children, ...props }) => {
    return (
        <figure className={`flex items-center justify-center ${className}`} {...props}>
            <Image src="/media/cross-grey-23.svg" height={23.22} width={23.22} />
        </figure>
    )
}