import Image from 'next/image'

export const UserIcon = ({ className, children, pageOn, ...props }) => {
    return (
        <figure className={`w-6 h-6 flex justify-center align-center ${className}`} {...props}>
            <Image src="/media/user-icon.svg" height={21} width={20} />
        </figure>
    )
}