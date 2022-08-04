import Link from 'next/link'
import { CreateInterpretationImage } from ".."
import { Context } from '../../components'
import { useContext } from 'react'

export const CreateInterPretationLink = ({ className, children, pageOn, onClick, userLoggedIn, ...props }) => {
    const { handleFeedback } = useContext(Context)

    const handleOnLinkClick = () => {
        if (!userLoggedIn)
            handleFeedback('info', 'Login needed', 'You should log in to create an interpretation')
    }

    return (
        <Link href={userLoggedIn ? '/create-interpretation' : '/login'} className={`${className}`} {...props}>
            <a onClick={function () {
                onClick()
                handleOnLinkClick()
            }}>
                <CreateInterpretationImage pageOn={pageOn} />
            </a>
        </Link>
    )
}

