import { useState, useRef } from 'react';
import { DISCORD_CONSTANTS } from '@/config/constants';
import { Channel } from '@/types/common';
import { mockServers, mockCurrentUser } from '@/config/mockData';
import { ProfilePopup } from '@/components/features/profile/ProfilePopup';
import { ChannelGroup } from '@/components/features/channels/ChannelGroup';
import { FiSettings } from 'react-icons/fi';
import { useChannel } from '@/contexts/ChannelContext';

interface ChannelSidebarProps {
  onItemClick?: () => void;
}

export const ChannelSidebar = ({ onItemClick }: ChannelSidebarProps) => {
  const { currentChannel, setCurrentChannel } = useChannel();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const userAreaRef = useRef<HTMLDivElement>(null);

  const channels = mockServers[0]?.channels || [];
  const textChannels = channels.filter(c => c.type === 'text' || c.type === 'announcement');
  const voiceChannels = channels.filter(c => c.type === 'voice');

  const handleChannelSelect = (channelId: string) => {
    const channel = channels.find(c => c.id === channelId);
    if (channel) {
      setCurrentChannel(channel);
      onItemClick?.();
    }
  };

  return (
    <div className="relative">
      <div
        className="bg-[#2f3136] flex flex-col h-screen"
        style={{ width: DISCORD_CONSTANTS.CHANNELS.SIDEBAR_WIDTH }}
      >
        {/* Server Header */}
        <div className="h-12 px-4 flex items-center justify-between shadow-md relative">
          <h2 className="font-semibold text-white truncate">Discord Clone</h2>
          <button className="text-gray-400 hover:text-gray-200">
            <FiSettings className="w-5 h-5" />
          </button>
        </div>

        {/* Watermark */}
        <div className="absolute bottom-16 right-0 pointer-events-none select-none z-10 px-4">
          <div className="text-white/20 text-xs font-medium">
            Made By Nehal
          </div>
        </div>

        {/* Channel List */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4 relative">
          <ChannelGroup
            name="Text Channels"
            channels={textChannels}
            onChannelSelect={handleChannelSelect}
            selectedChannelId={currentChannel?.id}
          />
          <ChannelGroup
            name="Voice Channels"
            channels={voiceChannels}
            onChannelSelect={handleChannelSelect}
            selectedChannelId={currentChannel?.id}
          />
        </div>

        {/* User Area */}
        <div
          ref={userAreaRef}
          className="h-14 px-3 flex items-center bg-[#292b2f] mt-auto cursor-pointer hover:bg-[#34373c] transition-colors relative z-50"
          onClick={() => setIsProfileOpen(true)}
        >
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src={mockCurrentUser.avatar}
                alt={mockCurrentUser.username}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-sm">
              <div className="text-white font-medium truncate max-w-[120px]">
                {mockCurrentUser.username}
              </div>
              <div className="text-gray-400 text-xs">Online</div>
            </div>
          </div>
        </div>
      </div>

      <ProfilePopup
        user={mockCurrentUser}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        anchorEl={userAreaRef.current}
      />
    </div>
  );
}; 