import Image from 'next/image'

export const SearchImage = ({ className, children, pageOn, color, ...props }) => {
    return (
        <figure className={`${className}`} {...props}>
            <Image 
            src={pageOn ? '/media/search-on.svg'
            :
            color === 'grey' ? '/media/search-grey.svg'
            :
            '/media/search-off.svg'}
            height={40} width={40} />
        </figure>
    )
}