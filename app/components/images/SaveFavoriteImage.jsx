import Image from 'next/image'

export const SaveFavoriteImage = ({ className, children, full, ...props }) => {
    return (
        <figure className={`flex items-center justify-center ${className}`} {...props}>
            <Image src="/media/save-favorite.svg" height={32} width={32} />
        </figure>
    )
}