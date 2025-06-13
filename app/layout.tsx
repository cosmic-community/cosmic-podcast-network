import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { getSiteSettings } from '@/lib/cosmic'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  
  return {
    title: settings?.metadata?.site_title || 'Cosmic Podcast Network',
    description: settings?.metadata?.description || 'The best entertainment in the galaxy™',
    keywords: ['video', 'streaming', 'entertainment', 'cosmic', 'podcast'],
    authors: [{ name: 'Cosmic Podcast Network' }],
    openGraph: {
      title: settings?.metadata?.site_title || 'Cosmic Podcast Network',
      description: settings?.metadata?.description || 'The best entertainment in the galaxy™',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: settings?.metadata?.site_title || 'Cosmic Podcast Network',
      description: settings?.metadata?.description || 'The best entertainment in the galaxy™',
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}