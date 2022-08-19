import Head from 'next/head'
import Link from 'next/link'
import { FlexColSection, Footer, Header, Context, InterpretationProfileItem, List, ArtistSquareItem, SpotifyAnchor } from '../components'
import { verifyTokenAndRedirect } from '../helpers'
import { checkSpotifySession, getTopArtists, retrieveUser, retrieveLastInterpretationsOfFollowed, retrieveMostVisitedInterpretations, retrieveMostVisitedArtists } from '../logic'
import { useContext, useState, useEffect } from 'react'

export default function Home({ isSessionActive, topArtists, user, interpretationsOfFollowed, mostVisitedInterpretations, mostVisitedArtists }) {
  const [dialogOpen, setDialogOpen] = useState(false)

  const { handleDialog } = useContext(Context)

  const handleClosedDialog = () => setDialogOpen('close')

  useEffect(() => {
    if (user && !dialogOpen && !isSessionActive) {

      handleDialog({
        title: 'Personalize your experience!',
        description: 'Connect now your Spotify account to easily find your favorites songs and artists.',
        button1: <SpotifyAnchor>Connect with Spotify</SpotifyAnchor>,
        button2: 'Not now',
        onClosedDialog: handleClosedDialog
      })

      setDialogOpen(true)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Pitch us | Explore chords of songs | Social media for musicians</title>
      </Head>

      <Header title='Explore' />

      <FlexColSection className={'bg-primary flex-1 overflow-y-auto' + (dialogOpen && dialogOpen !== 'close' ? ' brightness-50' : '')}>

        {topArtists && topArtists.length > 0 &&
          <List title='Most listened in Spotify'>
            {topArtists.map((artist, index) => {
              return <ArtistSquareItem artist={artist} index={index} key={artist.id} />
            })}
          </List>
        }

        {mostVisitedArtists && mostVisitedArtists.length > 0 &&
          <List title='Most popular artists'>
            {mostVisitedArtists.map((artist, index) => {
              return <ArtistSquareItem artist={artist} index={index + 3} key={artist.id} />
            })}
          </List>
        }

        {interpretationsOfFollowed && interpretationsOfFollowed.length > 0 &&
          <List className='h-48 flex-col' title='Recent versions from your contacts'>
            {interpretationsOfFollowed.map(interpretation => {
              return <InterpretationProfileItem interpretation={interpretation} user={interpretation.user} key={interpretation.id} />
            })}
          </List>
        }

        {mostVisitedInterpretations && mostVisitedInterpretations.length > 0 &&
          <List className='h-48 flex-col' title='Most popular interpretations'>
            {mostVisitedInterpretations.map(interpretation => {
              return <InterpretationProfileItem interpretation={interpretation} user={interpretation.user} key={interpretation.id} />
            })}
          </List>
        }

        <div className="w-full mt-auto mb-4 flex justify-center gap-4">
          <Link href="/terms-of-service"><a className="text-[8px] text-mygrey">Terms of service</a></Link>
          <Link href="/privacy-policy"><a className="text-[8px] text-mygrey">Privacy Policy</a></Link>
        </div>
      </FlexColSection >

      <Footer user={user} page='home' />
    </>
  )
}

export async function getServerSideProps(ctx) {
  debugger
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
