import Link from 'next/link'
import Head from 'next/head'
import { retrieveUser } from '../../../../logic'
import { verifyTokenAndRedirect } from '../../../../helpers'
import { useRouter } from 'next/router'
import { withContext, ChevronRightImage, FlexColSection, Footer, Header } from '../../../../components'

export default withContext(function Settings({ user, context: { handleFeedback } }) {
    const router = useRouter()

    const onLogOutClick = () => {
        handleFeedback('success', 'Log out', 'Redirecting to login page')

        router.push('/logout')
    }

    return (
        <>
            <Head>
                <title>Profile settings | PitchUs</title>
            </Head>

            <Header title="Profile" />

            <FlexColSection className="flex-1 overflow-y-auto">

                <figure className="w-full px-4 pt-2 flex gap-4 items-center border-b border-b-inputBg">
                    <img
                        className="w-16 h-16 rounded-full"
                        src={`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}/image`} />
                    <p className="text-myblack font-bold">{user.username}</p>
                </figure>

                <div className="px-4 py-2 flex items-center border-b border-b-inputBg">
                    <p className="py-2 text-myblack font-medium">Account Settings</p>
                </div>
                <Link href={`/profile/${user.username}/settings/edit`}>
                    <a className="w-full pl-10 pr-2 py-2 flex justify-between items-center border-b border-b-inputBg">
                        <p className="py-2 text-mygrey font-medium text-sm">Personal Information</p>
                        <div><ChevronRightImage className="w-6 h-6" />
                        </div>
                    </a>
                </Link>

                <Link href={`/profile/${user.username}/settings/upload-photo`}>
                    <a className="w-full pl-10 pr-2 py-2 flex justify-between items-center border-b border-b-inputBg">
                        <p className="py-2 text-mygrey font-medium text-sm">Change Photo/Avatar</p>
                        <div><ChevronRightImage className="w-6 h-6" />
                        </div>
                    </a>
                </Link>

                <Link href={`/profile/${user.username}/settings/change-password`}>
                    <a className="w-full pl-10 pr-2 py-2 flex justify-between items-center border-b border-b-inputBg">
                        <p className="py-2 text-mygrey font-medium text-sm">Change Password</p>
                        <div><ChevronRightImage className="w-6 h-6" />
                        </div>
                    </a>
                </Link>
                <Link href={`/profile/${user.username}/settings/delete-account`}>
                    <a className="w-full pl-10 pr-2 py-2 flex justify-between items-center border-b border-b-inputBg">
                        <p className="py-2 text-mygrey font-medium text-sm">Delete Account</p>
                        <div><ChevronRightImage className="w-6 h-6" />
                        </div>
                    </a>
                </Link>

                <button
                    className="mt-14 text-myblue font-medium"
                    onClick={onLogOutClick}
                >Log Out</button>

            </FlexColSection>

            <Footer user={user} page="user-session" />
        </>
    )
})

export async function getServerSideProps({ req, res, params: { username } }) {
    const token = await verifyTokenAndRedirect(req, res)

    if (!token) return { props: {} }

    const user = await retrieveUser(token)

    if (username !== user.username) {
        res.writeHead(307, { Location: `/profile/${user.username}/settings` })
        res.end()

        return { props: {} }
    }

    return { props: { user } }
}