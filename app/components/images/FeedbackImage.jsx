import Image from 'next/image'

export const FeedbackImage = ({ className, children, level, ...props }) => {
    return (
        <figure className={`flex items-center justify-center ${className}`} {...props}>
            <Image src={level === 'info' ? '/media/info.svg' : level === 'success' ? '/media/check.svg' : level === 'warning' ? '/media/warning.svg' : '/media/error.svg'}
             height={24} width={24} />
        </figure>
    )
}