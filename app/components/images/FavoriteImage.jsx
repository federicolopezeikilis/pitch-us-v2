import Image from 'next/image'

export const FavoriteImage = ({ className, children, full, ...props }) => {
    return (
        <figure className={`flex items-center justify-center ${className}`} {...props}>
            <Image src={full ? "/media/favorite-full.svg" : "/media/favorite.svg"} height={20} width={22} />
        </figure>
    )
}