import Image from 'next/image'

export const NotificationImage = ({ className, children, ...props }) => {
    return (
        <figure className={`${className}`} {...props}>
            <Image src="/media/notification-icon.svg" height={28} width={26.67} alt="Bell - open notifications button" />
        </figure>
    )
}