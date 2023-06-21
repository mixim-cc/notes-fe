"use client"

import { useRouter } from "next/navigation"
import { privateAgent } from "@/services/graphql/generated/axiosHelper"
import { CredentialResponse, GoogleLogin, useGoogleLogin } from "@react-oauth/google"

import { Button } from "@/components/ui/button"

export default function Page() {
  const router = useRouter()

  const login = async (token: string) => {
    const response = await privateAgent.post("/login", {
      token,
    })

    if (response) {
      router.push("/")
    }
  }

  const signup = async (token: string) => {
    try {
      const response = await privateAgent.post("/signup", {
        token,
      })

      if (response) {
        login(token)
      }
    } catch (e: any) {
      console.log(e.response.status)
      if (e.response.status === 400) {
        login(token)
      }
    }
  }

  const googleSignup = useGoogleLogin({
    flow: "auth-code", // another flow is "implicit"

    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse)
      signup(tokenResponse.code)
    },
  })

  return (
    <div className="flex min-h-screen items-center justify-center gap-16">
      {/* <GoogleLogin
        onSuccess={(response) => {
          signup(response.credential)
        }}
      /> */}
      <Button variant="outline" onClick={() => googleSignup()}>
        Login
      </Button>
    </div>
  )
}
