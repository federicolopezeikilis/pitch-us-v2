import Link from 'next/link'
import { retrieveUser } from '../../../../logic'
import { verifyTokenAndRedirect } from '../../../../helpers'
import { useRouter } from 'next/router'
import { ChevronRightImage, Context, FlexColSection, Footer, Header } from '../../../../components'
import { useContext } from 'react'
import { decodeJWTPayload } from '../../../../utils'

export default function Settings({ user }) {
    const router = useRouter()

    const { handleFeedback } = useContext(Context)

    const onLogOutClick = () => {
        handleFeedback('success', 'Log out', 'Redirecting to login page')

        router.push('/logout')
    }

    return (
        <div className="flex flex-col h-screen">
            <Header title="Profile" />

            <FlexColSection className="flex-1 overflow-y-auto">

                <figure className="w-full px-4 pt-2 flex gap-4 items-center border-b border-b-inputBg">
                    <img
                        className="w-16 h-16 rounded-full"
                        src={`http://localhost:8080/api/users/${user.id}/image`} />
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
        </div>

    )

}

export async function getServerSideProps({ req, res }) {
    const token = await verifyTokenAndRedirect(req, res)

    const user = await retrieveUser(token)

    return { props: { user } }
}