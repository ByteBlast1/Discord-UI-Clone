import { Server, Channel, User, Message } from '@/types/common';

export const mockCurrentUser: User = {
  id: '1',
  username: 'Sarah Chen',
  discriminator: '1234',
  status: 'online',
  avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah',
  customStatus: '🚀 Building awesome stuff!',
  badges: ['DEVELOPER', 'HYPESQUAD', 'NITRO']
};

export const mockUsers: { [key: string]: User } = {
  '1': mockCurrentUser,
  '2': {
    id: '2',
    username: 'Alex Kumar',
    discriminator: '5678',
    status: 'online',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Alex',
    customStatus: '🎮 Gaming',
    badges: ['BUG_HUNTER', 'EARLY_SUPPORTER']
  },
  '3': {
    id: '3',
    username: 'Emma Wilson',
    discriminator: '9012',
    status: 'idle',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Emma',
    customStatus: '📚 Studying',
  },
  '4': {
    id: '4',
    username: 'David Lee',
    discriminator: '3456',
    status: 'dnd',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=David',
    customStatus: '🎵 Making music',
  }
};

export const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Hey everyone! I just pushed some updates to the project. Can someone review the PR?',
    author: mockUsers['1'],
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  },
  {
    id: '2',
    content: 'Sure, I can take a look. Which branch is it on?',
    author: mockUsers['2'],
    timestamp: new Date(Date.now() - 3300000).toISOString(), // 55 minutes ago
  },
  {
    id: '3',
    content: 'It\'s on the feature/auth branch. I\'ve added some new authentication flows.',
    author: mockUsers['1'],
    timestamp: new Date(Date.now() - 3000000).toISOString(), // 50 minutes ago
  },
  {
    id: '4',
    content: 'The changes look good! Just left a few comments about error handling.',
    author: mockUsers['2'],
    timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
  },
];

// Create different message sets for different channels
const welcomeMessages: Message[] = [
  {
    id: 'w1',
    content: '👋 Welcome to the Project Hub! Feel free to introduce yourself!',
    author: mockUsers['1'],
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: 'w2',
    content: 'Hi everyone! Excited to be here. I\'m a frontend developer from Seattle.',
    author: mockUsers['3'],
    timestamp: new Date(Date.now() - 82800000).toISOString(),
  },
  {
    id: 'w3',
    content: 'Welcome @Emma Wilson! Great to have you here. Check out our development channels for ongoing projects.',
    author: mockUsers['2'],
    timestamp: new Date(Date.now() - 82700000).toISOString(),
  }
];

const announcementMessages: Message[] = [
  {
    id: 'a1',
    content: '🎉 **Major Update 2.0 Released!**\nCheck out our new features and improvements in the changelog.',
    author: mockUsers['1'],
    timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
  {
    id: 'a2',
    content: '📅 Team meeting scheduled for tomorrow at 10 AM PST. Don\'t forget to add your topics to the agenda!',
    author: mockUsers['2'],
    timestamp: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
  }
];

const developmentMessages: Message[] = [
  {
    id: 'd1',
    content: 'Just pushed some updates to the authentication system. Can someone review the PR?',
    author: mockUsers['4'],
    timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
  },
  {
    id: 'd2',
    content: 'I\'ll take a look. Which branch is it on?',
    author: mockUsers['2'],
    timestamp: new Date(Date.now() - 7000000).toISOString(),
  },
  {
    id: 'd3',
    content: 'feature/auth-improvements - main focus was on OAuth implementation',
    author: mockUsers['4'],
    timestamp: new Date(Date.now() - 6800000).toISOString(),
  },
  {
    id: 'd4',
    content: 'Looks good! Left some comments about error handling. Also, @Sarah Chen might want to check the UI changes.',
    author: mockUsers['2'],
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  }
];

export const mockServers: Server[] = [
  {
    id: '1',
    name: 'Project Hub',
    icon: 'https://api.dicebear.com/7.x/identicon/svg?seed=ProjectHub',
    channels: [
      {
        id: '1',
        name: 'welcome',
        type: 'text',
        position: 0,
        messages: welcomeMessages,
        isUnread: true
      },
      {
        id: '2',
        name: 'announcements',
        type: 'announcement',
        position: 1,
        messages: announcementMessages,
        permissions: {
          read: true,
          write: false
        }
      },
      {
        id: '3',
        name: 'general',
        type: 'text',
        position: 2,
        messages: mockMessages,
        isUnread: true,
        mentionCount: 2
      },
      {
        id: '4',
        name: 'development',
        type: 'text',
        position: 3,
        messages: developmentMessages,
        isUnread: true,
        mentionCount: 1
      },
      {
        id: '5',
        name: 'General VC',
        type: 'voice',
        position: 0,
        messages: []
      },
      {
        id: '6',
        name: 'Meeting Room',
        type: 'voice',
        position: 1,
        messages: []
      }
    ]
  },
  {
    id: '2',
    name: 'Design Team',
    icon: 'https://api.dicebear.com/7.x/identicon/svg?seed=DesignTeam',
    channels: []
  }
]; 