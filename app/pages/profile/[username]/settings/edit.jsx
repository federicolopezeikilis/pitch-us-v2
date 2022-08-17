import Link from 'next/link'
import Head from 'next/head'
import { retrieveUser, updateUser } from '../../../../logic'
import { verifyTokenAndRedirect } from '../../../../helpers'
import { useRouter } from 'next/router'
import { withContext, ChevronLeftImage, EditProfileForm, FlexColSection, Footer } from '../../../../components'
import { urlToString } from 'utils'
import { stringToUrl } from '../../../../utils'

export default withContext(function EditProfile({ token, user, context: { tryThis } }) {
    const router = useRouter()

    const handleFormSubmit = event => {
        event.preventDefault()

        const firstName = event.target.firstName.value
        const lastName = event.target.lastName.value
        const dateOfBirth = new Date(event.target.dateOfBirth.value)

        tryThis(async (handleFeedback) => {
            updateUser(token, { firstName, lastName, dateOfBirth })

            handleFeedback('success', 'Update Personal Information', 'Redirecting to settings page')

            router.push(`/profile/${stringToUrl(user.username, true)}/settings`)
        })
    }

    return (
        <>
            <Head>
                <title>Edit profile | PitchUs</title>
            </Head>

            <header className="shadow-custom-items pt-7 px-4 pb-4">
                <Link href={`/profile/${user.username}/settings`}>
                    <a>
                        <ChevronLeftImage className="w-8 h-8 float-left" />
                    </a>
                </Link>
                <h1 className="text-xl text-mygrey font-bold">Personal Information</h1>
            </header>
            <FlexColSection className="px-4 flex-1 overflow-y-auto bg-primary gap-5 justify-center items-center">
                <EditProfileForm
                    onSubmit={handleFormSubmit} user={user} />

            </FlexColSection>
            <Footer user={user} page="user-session" />
        </>
    )
})

export async function getServerSideProps({ req, res, params: { username } }) {
    const token = await verifyTokenAndRedirect(req, res)

    if (!token) return { props: {} }

    const user = await retrieveUser(token)

    if (urlToString(username) !== user.username) {
        res.writeHead(307, { Location: `/profile/${user.username}/settings/edit` })
        res.end()

        return { props: {} }
    }

    return { props: { user, token } }
}