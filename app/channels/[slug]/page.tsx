import { cosmic } from '@/lib/cosmic';
import { Channel, Video } from '@/types';
import VideoGrid from '@/components/VideoGrid';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getChannel(slug: string): Promise<Channel | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'channels', slug });
    return response.object as Channel;
  } catch (error) {
    if (error.status === 404) {
      return null;
    }
    throw error;
  }
}

async function getChannelVideos(channelId: string): Promise<Video[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'videos',
        'metadata.channel': channelId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as Video[];
  } catch (error) {
    if (error.status === 404) {
      return [];
    }
    throw error;
  }
}

export default async function ChannelPage({ params }: PageProps) {
  const { slug } = await params;
  const channel = await getChannel(slug);

  if (!channel) {
    notFound();
  }

  const videos = await getChannelVideos(channel.id);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Channel Header with Backsplash */}
      <div className="relative h-64 md:h-80">
        {channel.metadata.backsplash?.imgix_url ? (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${channel.metadata.backsplash.imgix_url}?w=1920&h=400&fit=crop&auto=format,compress)`
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-pink-900" />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        
        <div className="relative container mx-auto px-4 h-full flex items-end pb-8">
          <div className="flex items-end gap-6">
            {channel.metadata.thumbnail?.imgix_url && (
              <img
                src={`${channel.metadata.thumbnail.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                alt={channel.title}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white"
              />
            )}
            <div>
              <h1 className="text-3xl md:text-5xl font-bold mb-2">{channel.title}</h1>
              {channel.metadata.description && (
                <div 
                  className="text-gray-200 max-w-2xl"
                  dangerouslySetInnerHTML={{ __html: channel.metadata.description }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Channel Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Videos ({videos.length})</h2>
          <p className="text-gray-400">Latest content from {channel.title}</p>
        </div>

        {videos.length > 0 ? (
          <VideoGrid videos={videos} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No videos found for this channel</p>
          </div>
        )}
      </div>
    </div>
  );
}