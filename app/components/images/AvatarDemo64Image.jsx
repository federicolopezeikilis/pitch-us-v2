import Image from 'next/image'

export const AvatarDemo64Image = ({ className, children, ...props }) => {
    return (
        <figure className={`flex items-center justify-center ${className}`} {...props}>
            <Image src="/media/avatar-demo-64.svg" height={64} width={64} />
        </figure>
    )
}