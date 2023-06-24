/* eslint-disable @next/next/no-img-element */
import { SignInButton } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignInButton mode="modal">
        <Button variant="outline">
          <img src="/images/google.svg" alt="google" />
          Sign In With Google
        </Button>
      </SignInButton>
    </div>
  )
}
