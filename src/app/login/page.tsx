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

  //   const googleLogin = useGoogleLogin({
  //     onSuccess: async (tokenResponse) => {
  //       console.log(tokenResponse)
  //       // fetching userinfo can be done on the client or the server
  //       const userInfo = await privateAgent
  //         .get("https://www.googleapis.com/oauth2/v3/userinfo", {
  //           headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
  //         })
  //         .then((res) => res.data)

  //       console.log(userInfo)
  //     },
  //   })

  return (
    <div className="flex min-h-screen items-center justify-center">
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
      {/* <Button variant="outline" onClick={() => googleLogin()}>
        Login With Google - has access code
      </Button> */}
    </div>
  )
}
