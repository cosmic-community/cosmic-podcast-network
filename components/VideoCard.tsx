import Link from 'next/link'
import { Video } from '@/types'

interface VideoCardProps {
  video: Video
}

export default function VideoCard({ video }: VideoCardProps) {
  const thumbnail = video.metadata?.thumbnail
  const channel = video.metadata?.channel
  const categories = video.metadata?.categories || []
  
  return (
    <div className="card group hover:shadow-lg transition-shadow duration-300">
      <Link href={`/videos/${video.slug}`}>
        <div className="aspect-video relative overflow-hidden">
          {thumbnail && (
            <img
              src={`${thumbnail.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={video.title}
              width={400}
              height={225}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-black text-xl">▶</span>
            </div>
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            <Link href={`/videos/${video.slug}`}>
              {video.title}
            </Link>
          </h3>
        </div>
        
        {channel && (
          <p className="text-sm text-gray-600 mb-2">
            <Link href={`/channels/${channel.slug}`} className="hover:text-blue-600 transition-colors">
              {channel.title}
            </Link>
          </p>
        )}
        
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {categories.slice(0, 2).map((category) => (
              <span
                key={category.id}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
              >
                {category.metadata?.emoji && (
                  <span className="mr-1">{category.metadata.emoji}</span>
                )}
                {category.title}
              </span>
            ))}
          </div>
        )}
        
        {video.metadata?.description && (
          <div 
            className="text-sm text-gray-600 mt-2 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: video.metadata.description }}
          />
        )}
      </div>
    </div>
  )
}