import "@/styles/globals.css"
import Providers from "@/providers/provider"
import { ThemeProvider } from "@/providers/theme-provider"
import { cn } from "@/utils/cn"
import { fontSans } from "@/utils/fonts"
import { ClerkProvider } from "@clerk/nextjs"

import { Oasis } from "@/components/ui/oasis"

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
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head />

        <body className={cn("relative min-h-screen bg-base antialiased", fontSans.className)}>
          <Providers>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
            </ThemeProvider>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
