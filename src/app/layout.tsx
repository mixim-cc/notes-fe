import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import Providers from "@/providers/provider";
import { fontSans } from "@/utils/fonts";
import { ThemeProvider } from "@/providers/theme-provider";

export const metadata: Metadata = {
  title: {
    default: "Mixim Drafts",
    template: "%s | Mixim Drafts",
  },
  description:
    "Simple yet powerful Note-taking app for productive minds. Simplify your note-taking experience with Drafts, the minimalistic app designed to help you focus on what matters most: your ideas.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Mixim Drafts",
    description:
      "Simple yet powerful Note-taking app for productive minds. Simplify your note-taking experience with Drafts, the minimalistic app designed to help you focus on what matters most: your ideas.",
    url: "https://drafts.mixim.cc",
    siteName: "Mixim Drafts",
    images: [
      {
        url: "https://drafts.mixim.cc/og.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  icons: {
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={fontSans.className}>
          <Providers>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              {children}
            </ThemeProvider>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
