import "@/styles/globals.css"
import Providers from "@/providers/provider"
import { ThemeProvider } from "@/providers/theme-provider"
import { cn } from "@/utils/cn"
import { fontSans } from "@/utils/fonts"

export const metadata = {
  title: "Drafts",
  manifest: "/manifest.json",
  description: "Simple yet powerful note taking app for productive minds",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />

        <body className={cn("min-h-screen bg-base font-sans antialiased", fontSans.variable)}>
          <Providers>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
            </ThemeProvider>
          </Providers>
        </body>
      </html>
    </>
  )
}
