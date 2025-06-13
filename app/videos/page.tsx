'use client'

import { useState, useEffect, useMemo } from 'react'
import { getAllVideos, getAllCategories } from '@/lib/cosmic'
import { Video, Category } from '@/types'
import VideoGrid from '@/components/VideoGrid'
import CategoryFilter from '@/components/CategoryFilter'

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const [videosResponse, categoriesResponse] = await Promise.all([
          getAllVideos(),
          getAllCategories()
        ])
        
        setVideos(videosResponse)
        setCategories(categoriesResponse)
      } catch (err) {
        setError('Failed to load videos')
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredVideos = useMemo(() => {
    if (!selectedCategory) {
      return videos
    }
    
    return videos.filter(video => {
      if (!video.metadata?.categories) return false
      
      // Handle both single category and array of categories
      if (Array.isArray(video.metadata.categories)) {
        return video.metadata.categories.some((cat: Category) => cat.id === selectedCategory)
      } else {
        return (video.metadata.categories as Category).id === selectedCategory  
      }
    })
  }, [videos, selectedCategory])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Loading videos...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-red-400 text-lg">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">All Videos</h1>
          <p className="text-gray-400">Discover amazing content from across the galaxy</p>
        </div>

        {categories.length > 0 && (
          <div className="mb-8">
            <CategoryFilter 
              categories={categories} 
              onFilter={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          </div>
        )}

        {filteredVideos.length > 0 ? (
          <VideoGrid videos={filteredVideos} />
        ) : selectedCategory ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No videos found in this category</p>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No videos found</p>
          </div>
        )}
      </div>
    </div>
  )
}