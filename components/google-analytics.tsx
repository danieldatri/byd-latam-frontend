"use client";
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function GoogleAnalytics() {
  if (!GA_ID) return null;
  if (typeof window !== "undefined") {
    console.log("Google Analytics ID:", GA_ID);
  }
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
        async
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
