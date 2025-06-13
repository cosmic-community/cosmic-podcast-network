import Link from 'next/link'
import { Channel } from '@/types'

interface ChannelCardProps {
  channel: Channel
}

export default function ChannelCard({ channel }: ChannelCardProps) {
  const thumbnail = channel.metadata?.thumbnail
  const backsplash = channel.metadata?.backsplash
  
  return (
    <Link href={`/channels/${channel.slug}`}>
      <div className="card group hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-32 overflow-hidden">
          {backsplash ? (
            <img
              src={`${backsplash.imgix_url}?w=600&h=240&fit=crop&auto=format,compress`}
              alt={`${channel.title} background`}
              width={300}
              height={120}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full gradient-bg"></div>
          )}
          
          {thumbnail && (
            <div className="absolute -bottom-6 left-4 w-12 h-12 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src={`${thumbnail.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                alt={channel.title}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
        
        <div className="p-4 pt-8">
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
            {channel.title}
          </h3>
          
          {channel.metadata?.description && (
            <div 
              className="text-sm text-gray-600 line-clamp-2"
              dangerouslySetInnerHTML={{ __html: channel.metadata.description }}
            />
          )}
        </div>
      </div>
    </Link>
  )
}