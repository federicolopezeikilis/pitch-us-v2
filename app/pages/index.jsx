import { FlexColSection, Footer, Header, Context, InterpretationProfileItem, List, ArtistSquareItem } from "../components"
import { verifyTokenAndRedirect } from "../helpers"
import { checkSpotifySession, getTopArtists, retrieveUser, retrieveLastInterpretationsOfFollowed, retrieveMostVisitedInterpretations, retrieveMostVisitedArtists } from '../logic'
import { useContext, useState } from "react"
import Head from 'next/head'

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
    <>
      <Head>
        <title>PitchUs | Explore chords of songs | Social medial for musicians</title>
      </Head>

      <Header title="Explore" />

      <FlexColSection className={"bg-primary flex-1 overflow-y-auto" + (dialogOpen && dialogOpen !== 'close' ? ' brightness-50' : '')}>

        {topArtists && topArtists.length > 0 &&
          <List title="Most listened in Spotify">
            {topArtists.map((artist, index) => {
              return <ArtistSquareItem artist={artist} index={index} key={artist.id} />
            })}
          </List>
        }

        {mostVisitedArtists && mostVisitedArtists.length > 0 &&
          <List title="Most popular artists">
            {mostVisitedArtists.map((artist, index) => {
              return <ArtistSquareItem artist={artist} index={index} key={artist.id} />
            })}
          </List>
        }

        {interpretationsOfFollowed && interpretationsOfFollowed.length > 0 &&
          <List className="h-48 flex-col" title="Recent versions from your contacts">
            {interpretationsOfFollowed.map(interpretation => {
              return <InterpretationProfileItem interpretation={interpretation} user={interpretation.user} key={interpretation.id} />
            })}
          </List>
        }

        {mostVisitedInterpretations && mostVisitedInterpretations.length > 0 &&
          <List className="h-48 flex-col" title="Most popular interpretations">
            {mostVisitedInterpretations.map(interpretation => {
              return <InterpretationProfileItem interpretation={interpretation} user={interpretation.user} key={interpretation.id} />
            })}
          </List>
        }

      </FlexColSection >

      <Footer user={user} page="home" />
    </>
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
