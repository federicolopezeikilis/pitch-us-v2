import Image from 'next/image'

export const CreateInterpretationImage = ({ className, pageOn }) => {
    return (
        <figure className={`h-6 w-6 ${className || ''}`}>
            <Image
                src={pageOn ? '/media/create-interpretation-on.svg' : '/media/create-interpretation-off.svg'}
                alt="Create interpretation link"
                height={20}
                width={20}
            />
        </figure>
    )
}