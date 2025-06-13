import ChannelCard from './ChannelCard'
import { Channel } from '@/types'

interface ChannelListProps {
  channels: Channel[]
}

export default function ChannelList({ channels }: ChannelListProps) {
  if (!channels || channels.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No channels found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {channels.map((channel) => (
        <ChannelCard key={channel.id} channel={channel} />
      ))}
    </div>
  )
}