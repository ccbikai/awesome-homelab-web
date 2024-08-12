import "./globals.css"
import { ReactNode } from "react"
import localFont from "next/font/local"

import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"

import { ThemeProvider } from "./providers"

export const fontSans = localFont({
  src: "../fonts/haskoy.ttf",
  variable: "--font-sans",
})

const defaultUrl = process.env.BASE_URL
  ? process.env.BASE_URL
  : "http://localhost:3000"

const metabase = {
  name: "Awesome Homelab",
  title:
    "Awesome Homelab - Curating Top Open Source Apps for Homelab Enthusiasts",
  description:
    "Awesome Homelab offers the most comprehensive solutions for building and optimizing your home server. Discover top applications, tools, and guides to enhance your homelab environment. Whether you're a beginner or an expert, find everything you need right here.",
  keywords:
    "Homelab,Home server,Server applications,Home lab,Tech guides,Server optimization,Homelab tools,Tech enthusiasts,Server software,Network lab",
}

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: metabase.title,
  description: metabase.description,
  keywords: metabase.keywords,
  structuredData: {
    "@context": "http://schema.org",
    "@type": "WebSite",
    name: metabase.name,
    url: process.env.BASE_URL,
    description: metabase.description,
  },
  socialMediaTags: {
    "og:title": metabase.name,
    "og:description": metabase.description,
    "twitter:card": "summary_large_image",
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fontSans.variable} font-sans  `}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <main className="bg-[#FAFAFA] dark:bg-background  text-foreground flex flex-col justify-center items-center w-full pt-13">
              <div className=" w-full ">{children}</div>
            </main>
          </TooltipProvider>
          <Toaster richColors />
        </ThemeProvider>
        {process.env.FOOTER_INJECT && (
          <div
            dangerouslySetInnerHTML={{ __html: process.env.FOOTER_INJECT }}
          />
        )}
      </body>
    </html>
  )
}
