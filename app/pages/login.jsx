import { getProviders, signIn, getSession, getCsrfToken } from "next-auth/react";
import { withContext, FlexColSection, Logo, LoginForm, BlueAnchor, ButtonGreen, DivLabelInput, Input, PasswordInput, Label, GoogleIcon } from '../components'
import Head from 'next/head'
import { verifyTokenAndRedirect } from "../helpers";

export default withContext(function Login({ context: { tryThis }, providers, csrfToken }) {
    const handleFormSubmit = event => {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value

        event.target.reset()
        
        tryThis(async () => {
            signIn('credentials', { email, password })
        })
    }

    return (
        <>
            <Head>
                <title>Login | PitchUs</title>
            </Head>

            <FlexColSection className="h-full py-4 bg-primary gap-5 justify-center items-center">
                <Logo className="w-60 h-60 drop-shadow-custom-logo rounded-full bg-white" />
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
                            if (provider.name !== 'PitchUs')
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
    
    await verifyTokenAndRedirect(req, res)

    return {
        props: {
            providers: await getProviders(ctx),
            csrfToken: await getCsrfToken(ctx)
        }
    }
}

