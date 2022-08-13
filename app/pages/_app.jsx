import '../styles/globals.css'
import Head from 'next/head'
import { AppWrapper } from '../components'
// import { Provider } from 'next-auth/client'

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
    {/* <Provider session={pageProps.session}> */}
      <div className="box-border w-full h-full flex flex-col bg-white">
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
      </div>
    {/* </Provider> */}
  </>
}

export default MyApp