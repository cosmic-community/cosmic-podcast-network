// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status?: string;
  published_at?: string;
}

// Video interface
export interface Video extends CosmicObject {
  type: 'videos';
  metadata: {
    thumbnail?: {
      url: string;
      imgix_url: string;
    };
    video?: {
      url: string;
      imgix_url: string;
    };
    description?: string;
    featured?: boolean;
    categories?: Category[];
    channel?: Channel;
  };
}

// Channel interface
export interface Channel extends CosmicObject {
  type: 'channels';
  metadata: {
    thumbnail?: {
      url: string;
      imgix_url: string;
    };
    backsplash?: {
      url: string;
      imgix_url: string;
    };
    description?: string;
  };
}

// Category interface
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    emoji?: string;
  };
}

// Comment interface
export interface Comment extends CosmicObject {
  type: 'comments';
  metadata: {
    approved?: boolean;
    email?: string;
    comment?: string;
    resource?: Video;
    user?: User | null;
  };
}

// User interface
export interface User extends CosmicObject {
  type: 'users';
  metadata: {
    avatar?: {
      url: string;
      imgix_url: string;
    };
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    active_status?: boolean;
    email_verified?: boolean;
    verification_code?: string;
    verification_expiry?: string;
    reset_password_token?: string;
    reset_password_expiry?: string;
    channels?: Channel[];
  };
}

// Settings interface
export interface Settings extends CosmicObject {
  type: 'settings';
  metadata: {
    site_title?: string;
    tagline?: string;
    description?: string;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type guards
export function isVideo(obj: CosmicObject): obj is Video {
  return obj.type === 'videos';
}

export function isChannel(obj: CosmicObject): obj is Channel {
  return obj.type === 'channels';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

export function isComment(obj: CosmicObject): obj is Comment {
  return obj.type === 'comments';
}

export function isUser(obj: CosmicObject): obj is User {
  return obj.type === 'users';
}

export function isSettings(obj: CosmicObject): obj is Settings {
  return obj.type === 'settings';
}

// Utility types
export type CreateCommentData = Omit<Comment, 'id' | 'created_at' | 'modified_at' | 'slug'>;
export type VideoWithComments = Video & { comments?: Comment[] };