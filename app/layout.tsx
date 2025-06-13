import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { getSiteSettings } from '@/lib/cosmic'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

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
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}