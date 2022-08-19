import Head from 'next/head'
import { useState } from 'react'
import { withContext, ButtonGreen, FlexColSection, Footer, Header, InterpretationProfileItem, RateBlueImage } from "../../../components"
import { calculateInterpretationRankAverage, verifyTokenAndRedirect } from "../../../helpers"
import { retrieveUserByUsername, retrieveInterpretationsOfUser, retrieveUser, toggleFollow } from "../../../logic"
import { decodeJWTPayload } from '../../../utils'

export default withContext(function UserProfile({ token, userProfile, isOwnProfile, userIsFollowed, interpretations, user, context: { tryThis } }) {
    const [following, setFollowing] = useState(userIsFollowed)
    const [amountFollowers, setAmountFollowers] = useState(userProfile.followers.length)

    const amountFollowing = userProfile.following.length

    const rankArray = interpretations.reduce((previousValue, actualInterpretation) => previousValue.concat(actualInterpretation.ranks), [])

    const userRank = calculateInterpretationRankAverage(rankArray)

    const handleFollowingClick = () => {
        tryThis(async (handleFeedback) => {
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
        })
    }

    return (
        <>
            <Head>
                <title>{userProfile.username} profile | Pitch us</title>
            </Head>

            <Header title="Profile" user={isOwnProfile ? user : null} />

            <FlexColSection className="flex-1 overflow-y-auto bg-primary pt-4 flex items-center gap-4">

                <div className="w-fit flex flex-col gap-4">
                    <figure className="w-fit flex flex-col items-center justify-center gap-4">
                        <img
                            className="m-0 w-28 h-28 rounded-full"
                            src={`${process.env.NEXT_PUBLIC_API_URL}/users/${userProfile.id}/image`}
                            alt={`${userProfile.name} profile photo or avatar`} />
                        <figcaption className="w-fit font-bold text-xl text-mygrey">{userProfile.username}</figcaption>
                    </figure>

                    {!isOwnProfile &&
                        <ButtonGreen
                            onClick={handleFollowingClick}
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
                        <h3 className="leading-4 text-xs text-myblue">USER RANK</h3>
                    </div>
                    <div className="border border-inputBg rounded-lg bg-white h-16 flex flex-col justify-center items-center gap-2">
                        <p className="leading-4 text-myblue font-bold">{amountFollowers}</p>
                        <h3 className="leading-4 text-xs text-myblue">FOLLOWERS</h3>
                    </div>
                    <div className="border border-inputBg rounded-lg bg-white h-16 flex flex-col justify-center items-center gap-2">
                        <p className="leading-4 text-myblue font-bold">{amountFollowing}</p>
                        <h3 className="leading-4 text-xs text-myblue">FOLLOWING</h3>
                    </div>
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
        </ >
    )
})

export async function getServerSideProps({ params, req, res }) {
    const token = await verifyTokenAndRedirect(req, res)

    const { username } = params

    const userProfile = await retrieveUserByUsername(username)
    debugger
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