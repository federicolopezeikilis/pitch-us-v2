import Image from 'next/image'

export const SearchImage = ({ className, pageOn, color }) => {
    return (
        <figure className={`${className || ''}`}>
            <Image
                src={pageOn ? '/media/search-on.svg'
                    :
                    color === 'grey' ? '/media/search-grey.svg'
                        :
                        '/media/search-off.svg'}
                alt="Search link"
                height={40}
                width={40}
            />
        </figure>
    )
}