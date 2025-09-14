import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Regular Expressions',
  description: 'For CMPSC 461 at Penn State',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Regular Expressions',
    description: 'For CMPSC 461 at Penn State',
    url: 'https://regex.pranavkarra.me',
    images: [
      {
        url: 'https://regex.pranavkarra.me/og.png',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}