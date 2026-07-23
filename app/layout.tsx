import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const siteUrl = 'https://regex.pranavkarra.me'
const title = 'Learn Regular Expressions | Interactive Regex Course'
const description =
  'A free interactive course to learn and practice regular expressions, from literal characters and character classes to quantifiers, groups, and lookarounds. 39 hands-on lessons with live pattern testing. Built for CMPSC 461 at Penn State.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: 'Regular Expressions',
  keywords: [
    'regex',
    'regular expressions',
    'regex course',
    'learn regex',
    'regex practice',
    'regex tutorial',
    'CMPSC 461',
    'Penn State',
  ],
  authors: [{ name: 'Pranav Karra', url: 'https://pranavkarra.me' }],
  creator: 'Pranav Karra',
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    siteName: 'Regular Expressions',
    title,
    description,
    url: siteUrl,
    locale: 'en_US',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Regular Expressions, an interactive regex practice course',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og.png'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://pranavkarra.me/#person',
      name: 'Pranav Karra',
      url: 'https://pranavkarra.me',
    },
    {
      '@type': 'Course',
      name: 'Learn Regular Expressions',
      description:
        'A free interactive course to learn and practice regular expressions across 39 hands-on lessons, covering literal characters, character classes, anchors, quantifiers, groups, lookarounds, and real-world patterns, with live pattern testing.',
      url: siteUrl,
      inLanguage: 'en',
      isAccessibleForFree: true,
      learningResourceType: 'Interactive course',
      teaches: [
        'Regular expression syntax',
        'Character classes',
        'Quantifiers',
        'Groups and capturing',
        'Lookarounds',
        'Real-world pattern matching',
      ],
      creator: { '@id': 'https://pranavkarra.me/#person' },
      provider: { '@id': 'https://pranavkarra.me/#person' },
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
        courseWorkload: 'PT3H',
      },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
