import Image from 'next/image'

export const SettingsImage = ({ className, children, full, ...props }) => {
    return (
        <figure className={`flex items-center justify-center ${className}`} {...props}>
            <Image src="/media/settings-icon.svg" height={27} width={28} />
        </figure>
    )
}