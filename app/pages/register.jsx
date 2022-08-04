import { useContext } from 'react'
import Link from 'next/link'
import { registerUser } from '../logic'
import { useRouter } from 'next/router'
import { verifyTokenAndRedirect } from '../helpers'
import { FlexColSection, Logo, BlueAnchor, RegisterForm, Context } from '../components'

export default function Register() {
    const { handleFeedback } = useContext(Context)
    const router = useRouter()

    const onFormSubmit = async event => {
        event.preventDefault()

        const email = event.target.email.value
        const username = event.target.username.value
        const password = event.target.password.value
        const repeatPassword = event.target.repeatPassword.value

        try {
            await registerUser(username, email, password, repeatPassword)

            handleFeedback('success', 'Register', 'successfully registered')

            router.push('/login')
        } catch (error) {
            handleFeedback('error', 'Sign up failed', error.message)
        }
    }

    return (
        <FlexColSection className="min-h-screen bg-primary gap-5 justify-center items-center">
            <Logo className="w-72 h-72 drop-shadow-custom-logo rounded-full bg-white" />
            <RegisterForm className="px-4" onSubmit={onFormSubmit} />
            <div className="w-full gap-2 flex justify-center">
                <p className="text-myblack text-xs">Already have an account ?</p>
                <Link href="/login">
                    <BlueAnchor>Log In</BlueAnchor>
                </Link>
            </div>
        </FlexColSection>
    )
}

export async function getServerSideProps({ req, res }) {
    await verifyTokenAndRedirect(req, res)

    return { props: {} }
}