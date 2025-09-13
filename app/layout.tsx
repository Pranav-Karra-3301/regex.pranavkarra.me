import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Regex Mastery Course',
  description: 'Complete course to master regular expressions',
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