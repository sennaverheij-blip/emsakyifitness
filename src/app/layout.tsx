import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Presence Protocol — emsakyifitness',
  description: 'Engineer your presence. Build a physique that commands authority. Elite 1-on-1 coaching by Emin.',
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
