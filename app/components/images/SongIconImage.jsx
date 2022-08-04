import Image from 'next/image'

export const SongIconImage = ({ className, children, color, ...props }) => {
    return (
        <figure className={`flex items-center justify-center ${className}`} {...props}>
            <Image
                src={color === "grey" ? "/media/song-icon-grey.svg" :
                    color === "blue" ? "/media/song-icon-blue.svg" :
                        color === "light-blue" ? "/media/song-icon-blue-light.svg" :
                            color === "white" ? "/media/song-icon-white.svg" :
                                "/media/song-icon.svg"}
                height={color === "blue" || color === "light-blue" || color === "white" ? 18.86: 50} width={color === "blue" || color === "light-blue" || color === "white" ? 16 : 50} />
        </figure>
    )
}