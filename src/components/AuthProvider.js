import { useRouter } from "next/router"
import { createContext, useCallback, useEffect, useState } from "react"

import { useSession } from "next-auth/react"
import * as fcl from "@onflow/fcl"
import { signOut as nextAuthSignOut, signIn as nextAuthSignIn } from "next-auth/react"
//import { Session } from "next-auth"
//import { backendClient } from "../graphql/backendClient"
//import { WalletDocument } from "../../generated/graphql"
//import { getClientFromSession } from "../graphql/getClientFromSession"

/*
type AuthComponentProps = {
  children: React.ReactNode
  requireAuth: boolean | undefined
}

type AuthContextType = {
  session: Session
  isLoading: boolean
  signIn: (callbackUrl?: string) => Promise<void>
  signOut: () => Promise<void>
}
*/

export const AuthContext = createContext(null)

export function AuthProvider({ children, requireAuth }) {
  const router = useRouter()

  const { data: session, status } = useSession()
  const sessionLoading = status === "loading"


  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const isLoading = sessionLoading || isAuthenticating

  const signIn = useCallback(async (callbackUrl) => {
    setIsAuthenticating(true)
    await nextAuthSignIn("niftory", { callbackUrl })
    setIsAuthenticating(false)
  }, [])

  const signOut = useCallback(async (callbackUrl = "/") => {
    setIsAuthenticating(true)
    fcl.unauthenticate()
    await nextAuthSignOut({ redirect: false, callbackUrl })
    setIsAuthenticating(false)
  }, [])

  useEffect(() => {
  }, [session])

  useEffect(() => {
    if (!requireAuth || isLoading) {
      return
    }

    if (session?.error) {
      console.error(session.error)
      signOut()
      return
    }

    if (!session || !session?.userId) {
      router.push("/")
      return
    }
  }, [requireAuth, session, router, isLoading, signOut])

  useEffect(() => {
    if (session && !isLoading) {
      (async () => {
        console.log("now you should get all the info linked to the wallet")
        /*
        const client = await getClientFromSession(session)
        const { wallet } = await client.request(WalletDocument)
        if (!wallet) {
          backendClient("createWallet")
        }
        */
      })()
    }
  }, [isLoading, session])

  return (
    <AuthContext.Provider value={{ session, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}