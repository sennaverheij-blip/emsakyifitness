import type { Metadata } from 'next'
import Providers from '@/components/Providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Presence Protocol — emsakyifitness',
  description: 'Engineer your presence. Build a physique that commands authority. Elite 1-on-1 coaching by Emin.',
  icons: {
    icon: '/assets/icon.png',
    apple: '/assets/icon.png',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: 'EMSAKYI FITNESS',
    statusBarStyle: 'black-translucent',
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
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
