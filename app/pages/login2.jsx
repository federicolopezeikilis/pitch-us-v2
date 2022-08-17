import Head from 'next/head';
import React from 'react';
import {
  signIn,
  signOut,
  useSession
} from 'next-auth/react';

export default function Login2() {

  const { data: session } = useSession();

  return (
    <div>
      <Head>
        <title>Login || Pitch US</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

        {!session && <>
          <h1>You are not signed in</h1> <br />
          <button onClick={signIn}>Sign in</button>
        </>}

        {session && <>
          <h1>Signed in as </h1> <br />
          <button onClick={signOut}>Sign out</button>
        </>}

      </main>

      <footer>
        Powered by ki.si.io
      </footer>
    </div>
  )
}
