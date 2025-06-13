import { getAllVideos, getAllChannels, getAllCategories, getSiteSettings } from '@/lib/cosmic'
import Hero from '@/components/Hero'
import VideoGrid from '@/components/VideoGrid'
import ChannelList from '@/components/ChannelList'
import CategoryFilter from '@/components/CategoryFilter'

export default async function HomePage() {
  const [videos, channels, categories, settings] = await Promise.all([
    getAllVideos(),
    getAllChannels(),
    getAllCategories(),
    getSiteSettings()
  ])

  return (
    <div className="min-h-screen bg-gray-50">      
      <Hero settings={settings} />
      
      <main className="container py-12">
        {/* Featured Videos Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Videos</h2>
              <p className="text-gray-600">Discover the latest and greatest content</p>
            </div>
            <CategoryFilter categories={categories} />
          </div>
          
          <VideoGrid videos={videos.slice(0, 6)} />
          
          {videos.length > 6 && (
            <div className="text-center mt-8">
              <a 
                href="/videos"
                className="btn btn-secondary"
              >
                View All Videos
              </a>
            </div>
          )}
        </section>

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