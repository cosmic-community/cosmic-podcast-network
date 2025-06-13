'use client'

import { useState, useMemo } from 'react'
import { Video, Category } from '@/types'
import VideoGrid from './VideoGrid'
import CategoryFilter from './CategoryFilter'

interface FeaturedVideosSectionProps {
  videos: Video[]
  categories: Category[]
  maxVideos?: number
}

export default function FeaturedVideosSection({ videos, categories, maxVideos = 6 }: FeaturedVideosSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredVideos = useMemo(() => {
    if (!selectedCategory) {
      return videos
    }
    
    return videos.filter(video => {
      if (!video.metadata?.categories) return false
      
      // Handle both single category and array of categories
      if (Array.isArray(video.metadata.categories)) {
        return video.metadata.categories.some((cat: any) => cat.id === selectedCategory)
      } else {
        return video.metadata.categories.id === selectedCategory
      }
    })
  }, [videos, selectedCategory])

  const displayVideos = filteredVideos.slice(0, maxVideos)

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Videos</h2>
          <p className="text-gray-600">Discover the latest and greatest content</p>
        </div>
        <CategoryFilter 
          categories={categories} 
          onFilter={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
      </div>
      
      <VideoGrid videos={displayVideos} />
      
      {filteredVideos.length > maxVideos && (
        <div className="text-center mt-8">
          <a 
            href="/videos"
            className="btn btn-secondary"
          >
            View All Videos
          </a>
        </div>
      )}
      
      {filteredVideos.length === 0 && selectedCategory && (
        <div className="text-center py-12">
          <p className="text-gray-500">No videos found in this category</p>
        </div>
      )}
    </section>
  )
}