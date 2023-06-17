"use client"

import { useRouter } from "next/navigation"
import { privateAgent } from "@/services/graphql/generated/axiosHelper"
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google"

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

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse)
      login(tokenResponse.code)
    },
  })

  return (
    <div className="flex min-h-screen items-center justify-center gap-16">
      <GoogleLogin
        theme="filled_black"
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse)
          login(credentialResponse.credential)
        }}
        onError={() => {
          console.log("Login Failed")
        }}
      ></GoogleLogin>
      <Button variant="outline" onClick={() => googleLogin()}>
        Login With Google - Auth Code
      </Button>
    </div>
  )
}
