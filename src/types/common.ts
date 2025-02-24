export type BadgeType = 
  | 'STAFF'
  | 'PARTNER'
  | 'HYPESQUAD'
  | 'BUG_HUNTER'
  | 'NITRO'
  | 'BOOST'
  | 'DEVELOPER'
  | 'EARLY_SUPPORTER';

export interface User {
  id: string;
  username: string;
  discriminator?: string;
  avatar?: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
  customStatus?: string;
  badges?: BadgeType[];
}

export interface Server {
  id: string;
  name: string;
  icon?: string;
  channels: Channel[];
}

export type ChannelType = 'text' | 'voice' | 'announcement' | 'category';

export interface Channel {
  id: string;
  name: string;
  type: ChannelType;
  parentId?: string; // For channels under categories
  position: number;
  messages: Message[];
  isUnread?: boolean;
  mentionCount?: number;
  permissions?: {
    read: boolean;
    write: boolean;
    connect?: boolean; // For voice channels
  };
}

export interface Message {
  id: string;
  content: string;
  author: User;
  timestamp: string;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  url: string;
  type: 'image' | 'video' | 'file';
} 