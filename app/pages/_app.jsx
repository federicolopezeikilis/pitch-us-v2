import '../styles/globals.css'
import Head from 'next/head'
import { AppWrapper } from '../components'
import { SessionProvider } from 'next-auth/react'

if (typeof XMLHttpRequest === 'undefined') {
  var XMLHttpRequest = require('xhr2');

  global.XMLHttpRequest = XMLHttpRequest
}

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <title>PitchUs</title>
      <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1" />
    </Head>
    <div className="box-border w-full h-full flex flex-col bg-white">
      <AppWrapper>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </AppWrapper>
    </div>
  </>
}

export default MyApp