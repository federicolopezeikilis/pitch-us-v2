import Link from 'next/link'
import Head from 'next/head'
import { withContext, ChevronLeftImage, Fieldset, Input, Label, FlexColSection, Footer } from '../../../../components'
import { retrieveUser, updatePassword } from '../../../../logic'
import { verifyTokenAndRedirect } from '../../../../helpers'
import { useRouter } from 'next/router'
import { urlToString } from 'utils'
import { stringToUrl } from '../../../../utils'

export default withContext(function ChangePassword({ token, user, context: { tryThis } }) {
    const router = useRouter()

    const onFormSubmit = async event => {
        event.preventDefault()

        const oldPassword = event.target.oldPassword.value
        const password = event.target.password.value
        const repeatPassword = event.target.repeatPassword.value

        event.target.reset()

        tryThis(async (handleFeedback) => {
            await updatePassword(token, oldPassword, password, repeatPassword)

            handleFeedback('success', 'Change password', 'Redirecting to settings page')

            router.push(`/profile/${stringToUrl(user.username, true)}/settings`)
        })
    }

    return (
        <>
            <Head>
                <title>Change password | Pitch us</title>
            </Head>

            <header className="shadow-custom-items pt-7 px-4 pb-4">
                <Link href={`/profile/${user.username}/settings`}>
                    <a>
                        <ChevronLeftImage className="w-8 h-8 float-left" />
                    </a>
                </Link>
                <h1 className="text-xl text-mygrey font-bold">Change Password</h1>
            </header>
            <FlexColSection className="px-4 flex-1 overflow-y-auto bg-primary gap-5 justify-center items-center">

                <form
                    className="w-full flex flex-col items-around gap-6"
                    onSubmit={onFormSubmit}>

                    <div className="flex flex-col gap-4">
                        <Fieldset className="w-full flex flex-col">
                            <Label className="font-medium" htmlFor="oldPassword">Current Password</Label>
                            <Input type="password" name="oldPassword" id="oldPassword" placeholder="at least 8 characters" required />
                        </Fieldset>
                        <Fieldset className="w-full flex flex-col">
                            <Label className="font-medium" htmlFor="password">Password</Label>
                            <Input type="password" name="password" id="password" placeholder="at least 8 characters" required />
                        </Fieldset>
                        <Fieldset className="w-full flex flex-col">
                            <Label className="font-medium" htmlFor="repeatPassword">Password</Label>
                            <Input type="password" name="repeatPassword" id="repeatPassword" placeholder="at least 8 characters" required />
                        </Fieldset>
                    </div>
                    <button className="w-full py-4 rounded-full bg-mygreen flex items-center justify-center text-white font-medium" type="submit">Save</button>

                </form>

            </FlexColSection>
            <Footer page="user-session" user={user} />
        </>
    )
})

export async function getServerSideProps({ req, res, params: { username } }) {
    const token = await verifyTokenAndRedirect(req, res)

    if (!token) return { props: {} }

    const user = await retrieveUser(token)

    if (urlToString(username) !== user.username) {
        res.writeHead(307, { Location: `/profile/${user.username}/settings/change-password` })
        res.end()

        return { props: {} }
    }

    return { props: { user, token } }
}