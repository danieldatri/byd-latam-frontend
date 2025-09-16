import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Playfair_Display } from "next/font/google"
// import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Suspense } from "react"
import "./globals.css"
import GoogleAnalytics from "@/components/google-analytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "BYD Latam News - Noticias BYD en Latinoamérica",
  description:
    "Tu fuente de noticias sobre BYD en Latinoamérica. Últimas novedades, lanzamientos y análisis de BYD en todos los países de la región.",
  generator: "v0.app",
  keywords: "BYD, noticias, Latinoamérica, autos eléctricos, vehículos, tecnología",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans ${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        {/* <Analytics /> */}
        <SpeedInsights />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
