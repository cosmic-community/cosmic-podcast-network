<!-- README_START -->
# 🌟 Cosmic Podcast Network

A dynamic video streaming platform built with Next.js 15 and powered by [Cosmic](https://www.cosmicjs.com). This application showcases a comprehensive video network with channels, categories, user comments, and a complete content management system.

![Cosmic Podcast Network](https://imgix.cosmicjs.com/fae54cf0-4c54-11ef-b1ea-f56c65dfade9-Y20JJ_ddy9M.jpg?w=1200&h=600&fit=crop&auto=format,compress)

## ✨ Features

- 🎬 **Video Streaming Platform** - Browse and watch videos across multiple channels
- 📺 **Channel Management** - Organized content by dedicated channels with custom branding
- 🏷️ **Category System** - Filter videos by categories (Sports, Music, News, Gaming, Food)
- 💬 **Comment System** - User comments with approval workflow and moderation
- 👤 **User Management** - Complete user registration and authentication system
- ⚙️ **Site Settings** - Configurable site title, tagline, and description
- 📱 **Responsive Design** - Optimized for all devices with Tailwind CSS
- 🔍 **Search & Filter** - Advanced filtering by channels and categories
- ⚡ **Performance Optimized** - Server-side rendering with Next.js 15 App Router

## Clone this Bucket

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket to get started instantly:

[![Clone this Bucket](https://img.shields.io/badge/Clone%20this%20Bucket-4F46E5?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=my-project-production-89862850-474d-11f0-aa7f-adfe2544de32)

## 🛠️ Technologies Used

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Inter Font
- **CMS**: [Cosmic](https://www.cosmicjs.com) headless CMS
- **Deployment**: Vercel-ready with environment configuration
- **Package Manager**: Bun for fast dependency management

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- A Cosmic account with the cloned bucket

### Installation

1. **Clone this repository**
   ```bash
   git clone <your-repo-url>
   cd cosmic-podcast-network
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your Cosmic credentials:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. **Run the development server**
   ```bash
   bun run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Cosmic SDK Examples

### Fetching Videos with Related Data
```typescript
import { cosmic } from '@/lib/cosmic'

// Get videos with channel and category relationships
const videos = await cosmic.objects
  .find({ type: 'videos' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Access related data directly
videos.objects.forEach(video => {
  console.log(video.metadata.channel.title) // Channel name
  console.log(video.metadata.categories[0].title) // Category name
})
```

### Creating User Comments
```typescript
// Add a new comment with user relationship
await cosmic.objects.insertOne({
  type: 'comments',
  title: commenterName,
  metadata: {
    email: email,
    comment: commentText,
    approved: false,
    resource: videoId, // Link to video
    user: userId // Link to user (optional)
  }
})
```

### Filtering by Channel
```typescript
// Get videos from a specific channel
const channelVideos = await cosmic.objects
  .find({ 
    type: 'videos',
    'metadata.channel': channelId 
  })
  .depth(1)
```

## 🎯 Cosmic CMS Integration

This application leverages the full power of Cosmic's content management capabilities:

### Content Types
- **Videos** 📽️ - Main content with thumbnails, video files, descriptions
- **Channels** 📺 - Video organization with branding and descriptions  
- **Categories** 🏷️ - Content classification with emoji icons
- **Comments** 💬 - User engagement with approval workflow
- **Users** 👤 - User management with profiles and authentication
- **Settings** ⚙️ - Global site configuration

### Key Features
- **Object Relationships** - Videos linked to channels and categories
- **File Management** - Video uploads and thumbnail optimization
- **User-Generated Content** - Comment system with moderation
- **Rich Text Content** - HTML descriptions and formatted text
- **Switch Fields** - Boolean controls for approval states
- **Emoji Fields** - Visual category indicators

### API Configuration
The application uses Cosmic's staging environment:
```typescript
const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG,
  readKey: process.env.COSMIC_READ_KEY,
  writeKey: process.env.COSMIC_WRITE_KEY,
  apiEnvironment: "staging"
})
```

## 🚀 Deployment Options

### Vercel (Recommended)
1. Fork this repository
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Netlify
1. Connect repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `.next`
4. Add environment variables
5. Deploy

### Environment Variables for Production
Set these in your hosting platform:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## 📚 Learn More

- [Cosmic Documentation](https://www.cosmicjs.com/docs) - Learn about Cosmic CMS
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework

Built with ❤️ using [Cosmic](https://www.cosmicjs.com) headless CMS
<!-- README_END -->