import { cosmic } from '@/lib/cosmic';
import { Channel } from '@/types';
import ChannelList from '@/components/ChannelList';

async function getChannels(): Promise<Channel[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'channels' })
      .props(['id', 'title', 'slug', 'metadata']);
    return response.objects as Channel[];
  } catch (error) {
    // Handle empty results
    if (error.status === 404) {
      return [];
    }
    throw error;
  }
}

export default async function ChannelsPage() {
  const channels = await getChannels();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">All Channels</h1>
          <p className="text-gray-400">Explore content from your favorite creators</p>
        </div>

        {channels.length > 0 ? (
          <ChannelList channels={channels} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No channels found</p>
          </div>
        )}
      </div>
    </div>
  );
}