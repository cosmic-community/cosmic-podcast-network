import { createBucketClient } from '@cosmicjs/sdk'
import { Video, Channel, Category, Comment, Settings, CosmicResponse } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: "staging"
})

// Get all videos with related data
export async function getAllVideos(): Promise<Video[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'videos' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Video[]
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}

// Get video by slug
export async function getVideoBySlug(slug: string): Promise<Video | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'videos',
      slug
    }).depth(1)
    
    return response.object as Video
  } catch (error) {
    if (error.status === 404) {
      return null
    }
    throw error
  }
}

// Get videos by channel
export async function getVideosByChannel(channelId: string): Promise<Video[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'videos',
        'metadata.channel': channelId 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Video[]
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}

// Get videos by category
export async function getVideosByCategory(categoryIds: string[]): Promise<Video[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'videos',
        'metadata.categories': categoryIds
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Video[]
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}

// Get all channels
export async function getAllChannels(): Promise<Channel[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'channels' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Channel[]
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}

// Get channel by slug
export async function getChannelBySlug(slug: string): Promise<Channel | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'channels',
      slug
    }).depth(1)
    
    return response.object as Channel
  } catch (error) {
    if (error.status === 404) {
      return null
    }
    throw error
  }
}

// Get all categories
export async function getAllCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Category[]
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}

// Get comments for a video
export async function getCommentsByVideo(videoId: string): Promise<Comment[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'comments',
        'metadata.resource': videoId,
        'metadata.approved': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Comment[]
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}

// Create a new comment
export async function createComment(commentData: {
  title: string;
  email: string;
  comment: string;
  resourceId: string;
}): Promise<Comment> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'comments',
      title: commentData.title,
      metadata: {
        email: commentData.email,
        comment: commentData.comment,
        approved: false,
        resource: commentData.resourceId,
        user: null
      }
    })
    
    return response.object as Comment
  } catch (error) {
    console.error('Error creating comment:', error)
    throw new Error('Failed to create comment')
  }
}

// Get site settings
export async function getSiteSettings(): Promise<Settings | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'settings',
      slug: 'settings'
    })
    
    return response.object as Settings
  } catch (error) {
    if (error.status === 404) {
      return null
    }
    throw error
  }
}