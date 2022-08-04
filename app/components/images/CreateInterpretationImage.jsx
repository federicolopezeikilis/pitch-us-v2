import Image from 'next/image'

export const CreateInterpretationImage = ({ className, children, pageOn, ...props }) => {
    return (
        <figure className={`h-10 w-10 ${className}`} {...props}>
            <Image src={pageOn ? '/media/create-interpretation-on.svg': '/media/create-interpretation-off.svg'} height={40} width={40} />
        </figure>
    )
}