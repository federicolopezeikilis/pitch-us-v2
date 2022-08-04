import Image from 'next/image'

export const ArtistIconImage = ({ className, children, color, ...props }) => {
    return (
        <figure className={`flex items-center justify-center ${className}`} {...props}>
            <Image
                src={color === "grey" ? "/media/artist-icon-grey.svg" :
                    color === "blue" ? "/media/artist-icon-blue.svg" :
                        color === "blue-light" ? "/media/artist-icon-blue-light.svg" :
                            color === "white" ? "/media/artist-icon-white.svg" :
                                "/media/artist-icon.svg"}
                height={color === "blue" || color === "blue-light" || color === "white" ? 18.91: 50} width={color === "blue" || color === "blue-light" || color === "white" ? 22 : 50} />
        </figure>
    )
}