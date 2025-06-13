import { Settings } from '@/types'

interface HeroProps {
  settings: Settings | null
}

export default function Hero({ settings }: HeroProps) {
  const siteTitle = settings?.metadata?.site_title || 'Cosmic Podcast Network'
  const tagline = settings?.metadata?.tagline || 'The best entertainment in the galaxy™'
  const description = settings?.metadata?.description || 'A video streaming platform built with Cosmic CMS'
  
  return (
    <section className="gradient-bg text-white py-20">
      <div className="container text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
          {siteTitle}
        </h1>
        <p className="text-xl md:text-2xl mb-4 opacity-90">
          {tagline}
        </p>
        <p className="text-lg opacity-80 max-w-2xl mx-auto mb-8">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/videos" className="btn btn-primary bg-white text-black hover:bg-gray-100">
            Browse Videos
          </a>
          <a href="/channels" className="btn btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-black">
            Explore Channels
          </a>
        </div>
      </div>
    </section>
  )
}