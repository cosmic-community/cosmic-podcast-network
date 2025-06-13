import { getAllVideos, getAllChannels, getAllCategories, getSiteSettings } from '@/lib/cosmic'
import Hero from '@/components/Hero'
import VideoGrid from '@/components/VideoGrid'
import ChannelList from '@/components/ChannelList'
import FeaturedVideosSection from '@/components/FeaturedVideosSection'

export default async function HomePage() {
  const [videos, channels, categories, settings] = await Promise.all([
    getAllVideos(),
    getAllChannels(),
    getAllCategories(),  
    getSiteSettings()
  ])

  // Filter for featured videos (assuming there's a featured field in metadata)
  const featuredVideos = videos.filter(video => video.metadata?.featured === true)
  const displayVideos = featuredVideos.length > 0 ? featuredVideos : videos

  return (
    <div className="min-h-screen bg-gray-50">      
      <Hero settings={settings} />
      
      <main className="container py-12">
        {/* Featured Videos Section */}
        <FeaturedVideosSection 
          videos={displayVideos} 
          categories={categories}
          maxVideos={6}
        />

        {/* Channels Section */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Browse Channels</h2>
            <p className="text-gray-600">Explore content by your favorite channels</p>
          </div>
          
          <ChannelList channels={channels.slice(0, 4)} />
          
          {channels.length > 4 && (
            <div className="text-center mt-8">
              <a 
                href="/channels"
                className="btn btn-secondary"
              >
                View All Channels
              </a>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}