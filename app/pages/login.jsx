import Head from 'next/head'
import Link from "next/link";
import { useRouter } from "next/router";
import { getProviders, signIn } from "next-auth/react";
import { withContext, FlexColSection, Logo, LoginForm, BlueAnchor, GoogleIcon } from '../components'
import { verifyTokenAndRedirect } from "../helpers";
import { useEffect } from "react";
import { validatePassword } from "validators";

export default withContext(function Login({ context: { tryThis, handleFeedback }, providers, error }) {
    const router = useRouter()

    useEffect(() => {
        if (error)
            handleFeedback('error', 'Sign up error', 'there was an error on validation process')
    }, [])

    const handleFormSubmit = event => {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value

        tryThis(() => {
            validatePassword(password)

            event.target.reset()

            tryThis(async () => {
                const signInResult = await signIn('credentials', { email, password, redirect: false })

                if (signInResult.error) handleFeedback('error', 'Login failed', 'wrong credentials')

                else {
                    handleFeedback('success', 'Login', 'successfully logged in')

                    router.push('/')
                }
            })
        }, (error, handleFeedback) => {
            handleFeedback('error', 'Invalid password', error.message)
        })
    }

    return (
        <>
            <Head>
                <title>Login | Pitch Us</title>
            </Head>

            <FlexColSection className="h-full py-4 bg-primary gap-5 justify-center items-center">
                <Link href="/">
                    <a>
                        <Logo className="w-60 h-60 drop-shadow-custom-logo rounded-full bg-white" />
                    </a>
                </Link>
                <div className="w-full flex flex-col gap-14">
                    <div className="w-full flex flex-col gap-5">
                        <LoginForm className="px-4" onSubmit={handleFormSubmit} />
                        <div className="w-full gap-2 flex justify-center">
                            <p className="text-myblack text-xs">{"Don't have an account ?"}</p>
                            <BlueAnchor href="/register">Sign Up</BlueAnchor>
                        </div>
                    </div>

                    <div className="w-full px-4 flex items-center justify-center gap-1">
                        <div className="border-[0.6px] border-[#A39797] grow"></div>
                        <p className="text-xs font-light text-[#757171] grow-0">Or</p>
                        <div className="border-[0.6px] border-[#A39797] grow"></div>
                    </div>

                    <div className="w-full px-4">
                        {Object.values(providers).map(provider => {
                            if (provider.name !== 'Pitch Us')
                                return (
                                    <button key={provider.name}
                                        className="w-full border border-[#4285F4] rounded-[4px] flex justify-center items-center py-4 gap-2"
                                        onClick={() => signIn(provider.id)}>
                                        <GoogleIcon />
                                        <p className="text-sm font-bold flex items-center justify-center">Sign in with {provider.name}</p>
                                    </button>
                                )
                        })}
                    </div>
                </div>
            </FlexColSection>
        </>
    )
})

export async function getServerSideProps(ctx) {
    const { req, res } = ctx

    if (ctx.query.error)
        return {
            props: {
                error: true,
                providers: await getProviders(ctx),
            }
        }


    await verifyTokenAndRedirect(req, res)

    return { props: { providers: await getProviders(ctx) } }
}

