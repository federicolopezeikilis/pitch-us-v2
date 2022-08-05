import Link from 'next/link'
import { useState, useContext } from 'react'
import { Context, ButtonGreen, FlexColSection, Footer, Header, InterpretationProfileItem, RateBlueImage } from "../../../components"
import { calculateInterpretationRankAverage, verifyTokenAndRedirect } from "../../../helpers"
import { retrieveUserByUsername, retrieveInterpretationsOfUser, retrieveUser, toggleFollow } from "../../../logic"
import { decodeJWTPayload } from '../../../utils'

export default function UserProfile({ token, userProfile, isOwnProfile, userIsFollowed, interpretations, user }) {
    const { handleFeedback } = useContext(Context)

    const [following, setFollowing] = useState(userIsFollowed)
    const [amountFollowers, setAmountFollowers] = useState(userProfile.followers.length)

    const amountFollowing = userProfile.following.length

    const rankArray = interpretations.reduce((previousValue, actualInterpretation) => previousValue.concat(actualInterpretation.ranks), [])

    const userRank = calculateInterpretationRankAverage(rankArray)

    const handleOnFollowingClick = () => {
        try {
            if (token) {
                toggleFollow(token, userProfile.id)

                if (following === true) {
                    setFollowing(false)
                    setAmountFollowers(amountFollowers - 1)
                } else {
                    setFollowing(true)
                    setAmountFollowers(amountFollowers + 1)
                }
            } else {
                handleFeedback('info', 'Login needed', 'You should log in to follow someone else')
            }
        } catch (error) {
            handleFeedback('error', 'Error', error.message)
        }
    }

    return (
        <div className="flex flex-col h-[-webkit-fill-available]">

            <Header title="Profile" user={isOwnProfile ? user : null} />

            <FlexColSection className="flex-1 overflow-y-auto bg-primary pt-4 flex items-center gap-4">
                <div className="w-fit flex flex-col gap-4">
                    <figure className="w-fit flex flex-col items-center justify-center gap-4">
                        <img
                            className="m-0 w-28 h-28 rounded-full"
                            src={`${process.env.NEXT_PUBLIC_API_URL}/users/${userProfile.id}/image`} />
                        <figcaption className="w-fit font-bold text-xl text-mygrey">{userProfile.username}</figcaption>
                    </figure>

                    {!isOwnProfile && <ButtonGreen
                        onClick={handleOnFollowingClick}
                        active={!following}>
                        {following ? 'unfollow' : 'follow'}
                    </ButtonGreen>}

                </div>

                <div className="w-full grid px-4 grid-cols-3 grid-rows-1 gap-2">
                    <div className="w-full border border-inputBg rounded-lg bg-white h-16 flex flex-col justify-center items-center gap-2">
                        <div className="flex items-center justify-center gap-1">
                            <RateBlueImage />
                            <p className="leading-4 text-myblue font-bold">{userRank}</p>
                        </div>
                        <p className="leading-4 text-xs text-myblue">USER RANK</p>
                    </div>
                    <Link href="#">
                        <a className="border border-inputBg rounded-lg bg-white h-16 flex flex-col justify-center items-center gap-2">
                            <p className="leading-4 text-myblue font-bold">{amountFollowers}</p>
                            <p className="leading-4 text-xs text-myblue">FOLLOWERS</p>
                        </a>
                    </Link>
                    <Link href="#">
                        <a className="border border-inputBg rounded-lg bg-white h-16 flex flex-col justify-center items-center gap-2">
                            <p className="leading-4 text-myblue font-bold">{amountFollowing}</p>
                            <p className="leading-4 text-xs text-myblue">FOLLOWING</p>
                        </a>
                    </Link>
                </div>

                <div className="w-full px-4 flex flex-col">
                    <div className="w-full flex justify-between">
                        <h2 className="text-xl text-myblack font-bold">{(isOwnProfile ? 'my' : 'their') + ' interpretations'}</h2>
                    </div>

                    <ul className="flex flex-col gap-2">
                        {interpretations.length > 0 &&
                            interpretations.map(interpretation => <InterpretationProfileItem interpretation={interpretation} key={interpretation.id} />)}
                    </ul>
                </div>

            </FlexColSection >

            <Footer user={user} page={isOwnProfile && 'user-session'} />
        </div >
    )
}

export async function getServerSideProps({ params, req, res }) {
    const token = await verifyTokenAndRedirect(req, res)

    const { username } = params

    const userProfile = await retrieveUserByUsername(username)

    const interpretations = await retrieveInterpretationsOfUser(userProfile.id)

    if (token) {
        const userId = decodeJWTPayload(token)

        if (userId === userProfile.id)
            return { props: { token, userProfile, isOwnProfile: true, interpretations, user: userProfile } }

        else {
            const user = await retrieveUser(token)

            const userIsFollowed = user.following.some(userFollowing => userFollowing === userProfile.id)

            return { props: { token, userProfile, interpretations, userIsFollowed, user } }
        }
    } else {
        return { props: { userProfile, interpretations } }
    }
}