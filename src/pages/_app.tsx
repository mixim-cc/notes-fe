import "@/styles/globals.css"
import { type } from "os"
import { useEffect } from "react"
import Providers from "@/providers/provider"
import { ThemeProvider } from "@/providers/theme-provider"
import { triggerSync } from "@/services/redux/reducers/file-explorer-reducer"
import { fontSans } from "@/utils/fonts"
import { hasSeenWhatsNewModal } from "@/utils/userPreferences"
import { ClerkProvider } from "@clerk/nextjs"
import { Analytics } from "@vercel/analytics/react"
import { HotkeysProvider } from "react-hotkeys-hook"
import { useDispatch } from "react-redux"

import { Toaster } from "@/components/ui/toaster"
import WhatsNewModal from "@/components/global/WhatsNew"

// export const metadata = {
//   title: "Drafts",
//   manifest: "/manifest.json",
//   description: "Simple yet powerful note taking app for productive minds",
//   themeColor: [
//     { media: "(prefers-color-scheme: light)", color: "white" },
//     { media: "(prefers-color-scheme: dark)", color: "black" },
//   ],
// }

export default function App({ Component, pageProps }) {
  return (
    <main className={fontSans.className}>
      <ClerkProvider>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Component {...pageProps} />
            {!hasSeenWhatsNewModal() && <WhatsNewModal />}
            <Analytics />
            <Toaster />
          </ThemeProvider>
        </Providers>
      </ClerkProvider>
    </main>
  )
}
