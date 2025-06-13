import { cosmic } from '@/lib/cosmic';
import { Video, Category } from '@/types';
import VideoGrid from '@/components/VideoGrid';
import CategoryFilter from '@/components/CategoryFilter';

async function getVideos(): Promise<Video[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'videos' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.objects as Video[];
  } catch (error) {
    // Handle empty results
    if (error.status === 404) {
      return [];
    }
    throw error;
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata']);
    return response.objects as Category[];
  } catch (error) {
    // Handle empty results
    if (error.status === 404) {
      return [];
    }
    throw error;
  }
}

export default async function VideosPage() {
  const [videos, categories] = await Promise.all([
    getVideos(),
    getCategories()
  ]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">All Videos</h1>
          <p className="text-gray-400">Discover amazing content from across the galaxy</p>
        </div>

        {categories.length > 0 && (
          <div className="mb-8">
            <CategoryFilter categories={categories} />
          </div>
        )}

        {videos.length > 0 ? (
          <VideoGrid videos={videos} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No videos found</p>
          </div>
        )}
      </div>
    </div>
  );
}