import Image from 'next/image'

export const CreateInterpretationImage = ({ className, pageOn }) => {
    return (
        <figure className={`h-8 w-8 ${className || ''}`}>
            <Image
                src={pageOn ? '/media/create-interpretation-on.svg' : '/media/create-interpretation-off.svg'}
                alt="Create interpretation link"
                height={30}
                width={30}
            />
        </figure>
    )
}