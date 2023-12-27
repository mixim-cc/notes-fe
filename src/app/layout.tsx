import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import Providers from "@/providers/provider";

import { Analytics } from "@vercel/analytics/react";

import { ThemeProvider } from "@/providers/theme-provider";

import { GeistSans } from "geist/font/sans";

import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "Mixim Notes",
    template: "%s | Mixim Notes",
  },
  manifest: "./manifest.json",
  metadataBase: new URL("https://notes.mixim.cc"),
  description:
    "Simple yet powerful Note-taking app for productive minds. Simplify your note-taking experience with Notes, the minimalistic app designed to help you focus on what matters most: your ideas.",
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
    title: "Mixim Notes",
    description:
      "Simple yet powerful Note-taking app for productive minds. Simplify your note-taking experience with Notes, the minimalistic app designed to help you focus on what matters most: your ideas.",
    url: "https://notes.mixim.cc",
    siteName: "Mixim Notes",
    images: [
      {
        url: "https://notes.mixim.cc/og.png",
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
      <html lang="en" className={GeistSans.className} suppressHydrationWarning>
        <body>
          <Providers>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              <Toaster richColors position="top-right" />
              {children}
              <Analytics />
            </ThemeProvider>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
