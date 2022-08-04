import '../styles/globals.css'
import Head from 'next/head'
import { AppWrapper } from '../components';

if (typeof XMLHttpRequest === 'undefined') {
  var XMLHttpRequest = require('xhr2');

  global.XMLHttpRequest = XMLHttpRequest
}

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <title>PitchUs</title>
    </Head>
    <div className="box-border w-full min-h-screen h-full bg-white">
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </div>
  </>
}

export default MyApp