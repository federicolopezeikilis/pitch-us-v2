import { useContext } from 'react'
import { authenticateUser } from '../logic'
import { setCookie, verifyTokenAndRedirect } from '../helpers'
import { useRouter } from 'next/router'
import { FlexColSection, Logo, LoginForm, Context, BlueAnchor } from '../components'
import Head from 'next/head'

export default function Login() {
    const router = useRouter()

    const { handleFeedback } = useContext(Context)

    const onFormSubmit = async event => {
        try {
            const email = event.target.email.value
            const password = event.target.password.value

            event.target.reset()

            const token = await authenticateUser(email, password)

            handleFeedback('success', 'Login', 'successfully logged in')

            setCookie('token', token, '3600')

            router.push('/')
        } catch (error) {
            handleFeedback('error', 'Login failed', error.message)
        }
    }

    // tryThis(() => {
    
    // })

    // function tryThis(callback, handleError) {
    //     try {
    //         callback()

    //     } catch(error) {
    //         if(handleError) {
    //             handleError(error, () => {
                    
    //             })
    //         } else {
                
    //         }
    //     }
    // }
    
    return (
        <>
            <Head>
                <title>Login | PitchUs</title>
            </Head>
            
            <FlexColSection className="h-full py-4 bg-primary gap-5 justify-center items-center gap-10">
                <Logo className="w-60 h-60 drop-shadow-custom-logo rounded-full bg-white" />
                <LoginForm className="px-4" onSubmit={onFormSubmit} />
                <div className="w-full gap-2 flex justify-center">
                    <p className="text-myblack text-xs">{"Don't have an account ?"}</p>
                    <BlueAnchor href="/register">Sign Up</BlueAnchor>
                  </div>
            </FlexColSection>
        </>
    )
}

export async function getServerSideProps({ req, res }) {
    await verifyTokenAndRedirect(req, res)

    return { props: {} }
}

