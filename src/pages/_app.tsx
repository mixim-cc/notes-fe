import "@/styles/globals.css"
import Providers from "@/providers/provider"
import { ThemeProvider } from "@/providers/theme-provider"
import { fontSans } from "@/utils/fonts"
import { ClerkProvider } from "@clerk/nextjs"
import { Analytics } from "@vercel/analytics/react"

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
            <Analytics />
          </ThemeProvider>
        </Providers>
      </ClerkProvider>
    </main>
  )
}
