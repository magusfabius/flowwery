import '../styles/globals.css'

import React from "react"
import { SessionProvider } from "next-auth/react"

import { AuthProvider } from "../components/AuthProvider"
//import { ComponentWithAuth } from "../components/ComponentWithAuth"
import Head from "next/head"



const App = ({ Component, pageProps: { session, auth, ...pageProps } }) => {
  return (
    <>
      <Head>
        <title>Walletless Onboarding by Niftory</title>
      </Head>
      <SessionProvider session={session} refetchInterval={60 * 60}>
        <AuthProvider requireAuth={Component.requireAuth}>
              <Component {...pageProps} />
        </AuthProvider>
      </SessionProvider>
    </>
  )

}

export default App

/*
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
*/