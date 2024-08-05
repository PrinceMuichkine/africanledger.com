import { GeistSans } from 'geist/font/sans'
import { Analytics } from "@vercel/analytics/react"
import Script from 'next/script'
import { Toaster } from "@/components/ui/sonner";
import './globals.css'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'The African Ledger',
  description: 'Welcome to The African Ledger',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.className} dark`}>
      <body className="bg-black text-white">
        <main className="min-h-screen flex flex-col items-center">
          {children}
          <Analytics />
        </main>
        <Toaster />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8BS9YCKTYZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-8BS9YCKTYZ');
          `}
        </Script>
      </body>
    </html>
  )
}