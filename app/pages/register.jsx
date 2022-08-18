import Head from 'next/head'
import Link from 'next/link'
import { registerUser } from '../logic'
import { useRouter } from 'next/router'
import { verifyTokenAndRedirect } from '../helpers'
import { withContext, FlexColSection, Logo, BlueAnchor, RegisterForm } from '../components'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]'

export default withContext(function Register({ context: { tryThis } }) {
    const router = useRouter()

    const onFormSubmit = async event => {
        tryThis(async (handleFeedback) => {
            const email = event.target.email.value
            const username = event.target.username.value
            const password = event.target.password.value
            const repeatPassword = event.target.repeatPassword.value

            await registerUser(username, email, password, repeatPassword)

            handleFeedback('success', 'Register', 'successfully registered')

            router.push('/login')
        }, (error, handleFeedback) => {
            handleFeedback('error', 'Sign up failed', error.message)
        })
    }

    return (
        <>
            <Head>
                <title>Sign up | PitchUs</title>
            </Head>

            <FlexColSection className="h-fit py-4 bg-primary gap-5 justify-center items-center">

                <Link href="/">
                    <a>
                        <Logo className="w-60 h-60 drop-shadow-custom-logo rounded-full bg-white" />
                    </a>
                </Link>

                <RegisterForm className="px-4" onSubmit={onFormSubmit} />
                <div className="w-full gap-2 flex justify-center">
                    <p className="text-myblack text-xs">Already have an account ?</p>
                    <BlueAnchor href="/login">Log In</BlueAnchor>
                </div>

            </FlexColSection>
        </>
    )
})

export async function getServerSideProps({ req, res }) {
    const session = await unstable_getServerSession(req, res, authOptions)

    await verifyTokenAndRedirect(req, res, session)

    return { props: {} }
}