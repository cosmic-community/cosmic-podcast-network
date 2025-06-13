import Link from 'next/link'
import { Settings } from '@/types'

interface HeaderProps {
  settings: Settings | null
}

export default function Header({ settings }: HeaderProps) {
  const siteTitle = settings?.metadata?.site_title || 'Cosmic Podcast Network'
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="container py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🌟</span>
            </div>
            <span className="text-xl font-bold text-gray-900">{siteTitle}</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-black transition-colors">
              Home
            </Link>
            <Link href="/videos" className="text-gray-700 hover:text-black transition-colors">
              Videos
            </Link>
            <Link href="/channels" className="text-gray-700 hover:text-black transition-colors">
              Channels
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="btn btn-secondary">
              Search
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}