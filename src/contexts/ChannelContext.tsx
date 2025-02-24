import { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';
import { Channel, Message } from '@/types/common';
import { mockServers, mockCurrentUser } from '@/config/mockData';

interface ChannelContextType {
  currentChannel: Channel | null;
  channels: Channel[];
  unreadChannels: Set<string>;
  mentionCounts: Map<string, number>;
  setCurrentChannel: (channel: Channel) => void;
  markChannelAsRead: (channelId: string) => void;
  addMessage: (channelId: string, message: Message) => void;
  addMention: (channelId: string) => void;
}

const ChannelContext = createContext<ChannelContextType | null>(null);

export const ChannelProvider = ({ children }: { children: ReactNode }) => {
  const generalChannel = mockServers[0].channels.find(c => c.name === 'general');
  
  // Update state to include all channels
  const [channels, setChannels] = useState(mockServers[0].channels);
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(generalChannel || null);
  const [unreadChannels, setUnreadChannels] = useState<Set<string>>(
    new Set(mockServers[0].channels.filter(c => c.isUnread && c.id !== generalChannel?.id).map(c => c.id))
  );
  const [mentionCounts, setMentionCounts] = useState<Map<string, number>>(
    new Map(mockServers[0].channels.map(c => [c.id, c.mentionCount || 0]))
  );

  // Mark general channel as read on initial load
  useEffect(() => {
    if (generalChannel) {
      markChannelAsRead(generalChannel.id);
    }
  }, []);

  const markChannelAsRead = (channelId: string) => {
    setUnreadChannels(prev => {
      const next = new Set(prev);
      next.delete(channelId);
      return next;
    });
    setMentionCounts(prev => {
      const next = new Map(prev);
      next.set(channelId, 0);
      return next;
    });
  };

  const addMessage = (channelId: string, message: Message) => {
    setChannels(prevChannels => {
      const updatedChannels = prevChannels.map(channel => {
        if (channel.id === channelId) {
          return {
            ...channel,
            messages: [...channel.messages, message]
          };
        }
        return channel;
      });
      
      // Update currentChannel if the message is for the current channel
      if (currentChannel?.id === channelId) {
        const updatedCurrentChannel = updatedChannels.find(c => c.id === channelId);
        setCurrentChannel(updatedCurrentChannel || null);
      }
      
      return updatedChannels;
    });

    if (currentChannel?.id !== channelId) {
      setUnreadChannels(prev => new Set(prev).add(channelId));
      
      if (message.content.includes(`@${mockCurrentUser.username}`)) {
        addMention(channelId);
      }
    }
  };

  const addMention = (channelId: string) => {
    setMentionCounts(prev => {
      const next = new Map(prev);
      next.set(channelId, (next.get(channelId) || 0) + 1);
      return next;
    });
  };

  const handleChannelSelect = (channel: Channel) => {
    // Find the updated channel from the channels state
    const updatedChannel = channels.find(c => c.id === channel.id) || channel;
    setCurrentChannel(updatedChannel);
    markChannelAsRead(channel.id);
  };

  const contextValue = useMemo(() => ({
    currentChannel,
    channels,
    unreadChannels,
    mentionCounts,
    setCurrentChannel: handleChannelSelect,
    markChannelAsRead,
    addMessage,
    addMention,
  }), [currentChannel, channels, unreadChannels, mentionCounts]);

  return (
    <ChannelContext.Provider value={contextValue}>
      {children}
    </ChannelContext.Provider>
  );
};

export const useChannel = () => {
  const context = useContext(ChannelContext);
  if (!context) {
    throw new Error('useChannel must be used within a ChannelProvider');
  }
  return context;
}; 