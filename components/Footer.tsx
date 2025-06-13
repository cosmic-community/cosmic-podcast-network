import { Settings } from '@/types'

interface FooterProps {
  settings: Settings | null
}

export default function Footer({ settings }: FooterProps) {
  const siteTitle = settings?.metadata?.site_title || 'Cosmic Podcast Network'
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">🌟</span>
              </div>
              <span className="text-xl font-bold">{siteTitle}</span>
            </div>
            <p className="text-gray-400 mb-4">
              {settings?.metadata?.description || 'The best entertainment in the galaxy™'}
            </p>
            <p className="text-gray-500 text-sm">
              Built with <a href="https://www.cosmicjs.com" className="text-blue-400 hover:text-blue-300">Cosmic</a> headless CMS
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <a href="/videos" className="text-gray-400 hover:text-white transition-colors">
                  Videos
                </a>
              </li>
              <li>
                <a href="/channels" className="text-gray-400 hover:text-white transition-colors">
                  Channels
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  YouTube
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} {siteTitle}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}