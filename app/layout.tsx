import type { Metadata } from 'next'
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
    images: [
      {
        url: '/og.png',
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
      <body>{children}</body>
    </html>
  )
}