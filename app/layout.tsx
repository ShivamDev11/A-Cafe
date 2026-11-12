import React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "BREW & BEYOND — More Than Coffee. It’s an Experience.",
  description: "Discover BREW & BEYOND: exceptional coffee, a considered ritual, and a little room to stay awhile in Williamsburg, Brooklyn.",
  applicationName: "BREW & BEYOND",
  icons: { icon: "/icon.svg" },
}

export const viewport: Viewport = {
  themeColor: "#160D09",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
