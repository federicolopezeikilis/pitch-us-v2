import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { retrieveUser } from '../../../../logic'
import { verifyTokenAndRedirect } from '../../../../helpers'
import { withContext, ChevronRightImage, FlexColSection, Footer, Header } from '../../../../components'
import { urlToString } from 'utils'
import { stringToUrl } from '../../../../utils'
import { signOut } from 'next-auth/react';


export default withContext(function Settings({ user, context: { handleFeedback, tryThis } }) {
    const router = useRouter()

    const handleLogout = () => {
        tryThis(async () => {
            await signOut({ redirect: false })
            
            handleFeedback('success', 'Logout', 'Redirecting to login page')

            router.push('/login')
        }, (_, handleFeedback) => {
            handleFeedback('error', 'Logout Error', 'there was an error on logout process')
        })
    }

    return (
        <>
            <Head>
                <title>Profile settings | Pitch us</title>
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
                <Link href={`/profile/${stringToUrl(user.username, true)}/settings/edit`}>
                    <a className="w-full pl-10 pr-2 py-2 flex justify-between items-center border-b border-b-inputBg">
                        <p className="py-2 text-mygrey font-medium text-sm">Personal Information</p>
                        <div><ChevronRightImage className="w-6 h-6" />
                        </div>
                    </a>
                </Link>

                <Link href={`/profile/${stringToUrl(user.username, true)}/settings/upload-photo`}>
                    <a className="w-full pl-10 pr-2 py-2 flex justify-between items-center border-b border-b-inputBg">
                        <p className="py-2 text-mygrey font-medium text-sm">Change Photo/Avatar</p>
                        <div><ChevronRightImage className="w-6 h-6" />
                        </div>
                    </a>
                </Link>

                <Link href={`/profile/${stringToUrl(user.username, true)}/settings/change-password`}>
                    <a className="w-full pl-10 pr-2 py-2 flex justify-between items-center border-b border-b-inputBg">
                        <p className="py-2 text-mygrey font-medium text-sm">Change Password</p>
                        <div><ChevronRightImage className="w-6 h-6" />
                        </div>
                    </a>
                </Link>
                <Link href={`/profile/${stringToUrl(user.username, true)}/settings/delete-account`}>
                    <a className="w-full pl-10 pr-2 py-2 flex justify-between items-center border-b border-b-inputBg">
                        <p className="py-2 text-mygrey font-medium text-sm">Delete Account</p>
                        <div><ChevronRightImage className="w-6 h-6" />
                        </div>
                    </a>
                </Link>

                <div className="w-full flex items-center justify-center">
                    <button
                        className="mt-14 text-myblue font-medium"
                        onClick={handleLogout}
                    >Log Out</button>
                </div>
            </FlexColSection>

            <Footer user={user} page="user-session" />
        </>
    )
})

export async function getServerSideProps({ req, res, params: { username } }) {
    debugger
    const token = await verifyTokenAndRedirect(req, res)

    if (!token) return { props: {} }

    const user = await retrieveUser(token)

    if (urlToString(username) !== user.username) {
        res.writeHead(307, { Location: `/profile/${stringToUrl(user.username, true)}/settings` })
        res.end()

        return { props: {} }
    }

    return { props: { user } }
}