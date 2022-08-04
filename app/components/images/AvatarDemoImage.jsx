import Image from 'next/image'

export const AvatarDemoImage = ({ className, children, ...props }) => {
    return (
        <figure className={`flex items-center justify-center ${className}`} {...props}>
            <Image src="/media/avatar-demo.svg" height={48} width={48} />
        </figure>
    )
}