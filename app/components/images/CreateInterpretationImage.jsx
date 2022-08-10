import Image from 'next/image'

export const CreateInterpretationImage = ({ className, pageOn }) => {
    return (
        <figure className={`h-10 w-10 ${className || ''}`}>
            <Image
                src={pageOn ? '/media/create-interpretation-on.svg' : '/media/create-interpretation-off.svg'}
                alt="Create interpretation link"
                height={40}
                width={40}
            />
        </figure>
    )
}