import Image from 'next/image'

export const GoogleIcon = ({ className, children, ...props }) => {
    return (
        <figure className={`flex items-center justify-center ${className}`} {...props}>
            <Image src='/media/google-icon.svg'
             height={20} width={20} />
        </figure>
    )
}