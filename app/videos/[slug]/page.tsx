import { cosmic } from '@/lib/cosmic';
import { Video, Comment } from '@/types';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getVideo(slug: string): Promise<Video | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'videos', slug })
      .depth(1);
    return response.object as Video;
  } catch (error: any) {
    if (error?.status === 404) {
      return null;
    }
    throw error;
  }
}

async function getVideoComments(videoId: string): Promise<Comment[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'comments',
        'metadata.resource': videoId,
        'metadata.approved': true
      })
      .depth(1);
    return response.objects as Comment[];
  } catch (error: any) {
    if (error?.status === 404) {
      return [];
    }
    throw error;
  }
}

export default async function VideoPage({ params }: PageProps) {
  const { slug } = await params;
  const video = await getVideo(slug);

  if (!video) {
    notFound();
  }

  const comments = await getVideoComments(video.id);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Video Player Section */}
        <div className="mb-8">
          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-6">
            {video.metadata.video?.url ? (
              <video
                controls
                className="w-full h-full object-cover"
                poster={video.metadata.thumbnail?.imgix_url ? 
                  `${video.metadata.thumbnail.imgix_url}?w=1200&h=675&fit=crop&auto=format,compress` : 
                  undefined
                }
              >
                <source src={video.metadata.video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : video.metadata.thumbnail?.imgix_url ? (
              <img
                src={`${video.metadata.thumbnail.imgix_url}?w=1200&h=675&fit=crop&auto=format,compress`}
                alt={video.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-400">No video available</p>
              </div>
            )}
          </div>

          <h1 className="text-3xl font-bold mb-4">{video.title}</h1>
          
          {video.metadata.description && (
            <div 
              className="text-gray-300 mb-6"
              dangerouslySetInnerHTML={{ __html: video.metadata.description }}
            />
          )}

          {/* Channel and Categories */}
          <div className="flex flex-wrap gap-4 items-center mb-6">
            {video.metadata.channel && (
              <Link 
                href={`/channels/${video.metadata.channel.slug}`}
                className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 rounded-lg p-3 transition-colors"
              >
                {video.metadata.channel.metadata.thumbnail?.imgix_url && (
                  <img
                    src={`${video.metadata.channel.metadata.thumbnail.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={video.metadata.channel.title}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <span className="font-medium">{video.metadata.channel.title}</span>
              </Link>
            )}

            {video.metadata.categories && video.metadata.categories.length > 0 && (
              <div className="flex gap-2">
                {video.metadata.categories.map((category) => (
                  <span
                    key={category.id}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-purple-600 text-white rounded-full text-sm"
                  >
                    {category.metadata.emoji && (
                      <span>{category.metadata.emoji}</span>
                    )}
                    {category.title}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Comments Section */}
        {comments.length > 0 && (
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-800 pb-4 last:border-b-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {comment.title.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="font-medium">{comment.title}</span>
                    <span className="text-gray-400 text-sm">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div 
                    className="text-gray-300 ml-11"
                    dangerouslySetInnerHTML={{ __html: comment.metadata.comment || '' }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}