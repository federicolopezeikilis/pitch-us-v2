import { FlexColSection, Footer, Header, Context, Title2, InterpretationProfileItem } from "../components"
import { verifyTokenAndRedirect } from "../helpers"
import { checkSpotifySession, getTopArtists, retrieveUser, retrieveLastInterpretationsOfFollowed, retrieveMostVisitedInterpretations, retrieveMostVisitedArtists } from '../logic'
import { useContext, useState } from "react"
import Link from "next/link";

export default function Home({ isSessionActive, topArtists, user, interpretationsOfFollowed, mostVisitedInterpretations, mostVisitedArtists }) {
  const [dialogOpen, setDialogOpen] = useState(false)

  const { handleDialog } = useContext(Context)

  const handleOnCloseDialog = () => setDialogOpen('close')

  if (user && !dialogOpen && !isSessionActive) {
    handleDialog({
      title: 'Personalize your experience!',
      description: 'Connect now your Spotify account to easily find your favorites songs and artists.',
      button1: 'Connect with Spotify',
      button2: 'Not now',
      onCloseDialog: handleOnCloseDialog
    })

    setDialogOpen(true)
  }

  return (
    <div className={'flex flex-col h-[-webkit-fill-available]'}>
      <Header title="Explore" />

      <FlexColSection className={"bg-primary flex-1 overflow-y-auto" + (dialogOpen && dialogOpen !== 'close' ? ' brightness-50' : '')}>

        {topArtists &&
          <div className="py-4 w-full flex flex-col gap-2">
            <h2 className="px-4 text-xl font-bold text-mygrey">Most listened in Spotify</h2>

            <ul className="px-4 flex items-center overflow-x-auto scrollbar-hide gap-2">

              {topArtists.map((artist, index) => {
                return (

                  <li
                    className={'min-w-[112px] h-28 rounded-lg ' +
                      (index % 4 === 0 ? 'bg-gradient-orange' : index % 4 === 1 ? 'bg-gradient-purple' : index % 4 === 2 ? 'bg-gradient-yellow' : 'bg-gradient-green')}
                    key={index*1000}>
                    <Link href={`/artist/${artist.name}`}>
                      <a className="w-full h-full p-2 flex items-end text-xl font-bold text-white">{artist.name}</a>
                    </Link>
                  </li>

                )
              })}

            </ul>
          </div>
        }

        {mostVisitedArtists && mostVisitedArtists.length > 0 &&
          <div className="py-4 w-full flex flex-col gap-2">
            <h2 className="px-4 text-xl font-bold text-mygrey">Most popular artists</h2>

            <ul className="px-4 flex items-center overflow-x-auto scrollbar-hide gap-2">

              {mostVisitedArtists.map((artist, index) => {
                return (

                  <li
                    className={'min-w-[112px] h-28 rounded-lg ' +
                      (index % 4 === 0 ? 'bg-gradient-yellow' : index % 4 === 1 ? 'bg-gradient-green' : index % 4 === 2 ? 'bg-gradient-orange' : 'bg-gradient-purple')}
                    key={index * 10}>
                    <Link href={`/artist/${artist.name}`}>
                      <a className="w-full h-full p-2 flex items-end text-xl font-bold text-white">{artist.name}</a>
                    </Link>
                  </li>

                )
              })}

            </ul>
          </div>
        }

        {interpretationsOfFollowed && interpretationsOfFollowed.length > 0 &&
          <div className="py-4 w-full flex flex-col gap-2">
            <h2 className="px-4 text-xl font-bold text-mygrey">Recent versions from your contacts</h2>

            <ul className="h-48 px-4 flex flex-col items-center overflow-x-auto scrollbar-hide gap-2">

              {interpretationsOfFollowed.map(interpretation => {
                return <InterpretationProfileItem interpretation={interpretation} user={interpretation.user} key={interpretation.id} />
              })}

            </ul>
          </div>
        }

        {mostVisitedInterpretations && mostVisitedInterpretations.length > 0 &&
          <div className="py-4 w-full flex flex-col gap-2">
            <h2 className="px-4 text-xl font-bold text-mygrey">Most Popular Interpretations</h2>

            <ul className="h-48 px-4 flex flex-col items-center overflow-x-auto scrollbar-hide gap-2">

              {mostVisitedInterpretations.map(interpretation => {
                return <InterpretationProfileItem interpretation={interpretation} user={interpretation.user} key={interpretation.id*10} />
              })}

            </ul>
          </div>
        }

      </FlexColSection >

      <Footer user={user} page="home" />
    </div >
  )
}

export async function getServerSideProps(ctx) {
  const { req, res } = ctx

  const token = await verifyTokenAndRedirect(req, res)

  const [mostVisitedInterpretations, mostVisitedArtists] = await Promise.all([retrieveMostVisitedInterpretations(), retrieveMostVisitedArtists()])

  if (token) {
    const user = await retrieveUser(token)

    const interpretationsOfFollowed = await retrieveLastInterpretationsOfFollowed(token)

    if (ctx.query.code) {
      const isSessionActive = await checkSpotifySession(token, ctx.query.code)

      if (isSessionActive) {
        const topArtists = await getTopArtists(token)

        return { props: { topArtists, isSessionActive, user, interpretationsOfFollowed, mostVisitedInterpretations, mostVisitedArtists } }

      } else return { props: { isSessionActive, user, interpretationsOfFollowed, mostVisitedInterpretations, mostVisitedArtists } }

    } else {
      const isSessionActive = await checkSpotifySession(token)

      if (isSessionActive) {
        const topArtists = await getTopArtists(token)

        return { props: { topArtists, isSessionActive, user, interpretationsOfFollowed, mostVisitedInterpretations, mostVisitedArtists } }

      } else return { props: { isSessionActive, user, interpretationsOfFollowed, mostVisitedInterpretations, mostVisitedArtists } }
    }

  } else return { props: { mostVisitedInterpretations, mostVisitedArtists } }
}
