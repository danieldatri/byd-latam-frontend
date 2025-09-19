import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Playfair_Display } from "next/font/google"
// import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Suspense } from "react"
import "./globals.css"
import Script from "next/script";
import HeaderBlock from "@/components/header-block";

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

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        {/* Script de Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2065336018146714"
          crossOrigin="anonymous"
        />
        {GA_ID && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <Script id="google-analytics">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className={`font-sans ${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} antialiased`}>
        <HeaderBlock />
        <div style={{ height: '104px' }} />
        <div>
          <Suspense fallback={null}>{children}</Suspense>
        </div>
        {/* <Analytics /> */}
        <SpeedInsights />
      </body>
    </html>
  )
}
