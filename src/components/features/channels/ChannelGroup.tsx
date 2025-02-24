import { useState, memo } from 'react';
import { Channel } from '@/types/common';
import { FiChevronRight, FiHash, FiVolume2, FiLock } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { useChannel } from '@/contexts/ChannelContext';

interface ChannelGroupProps {
  name: string;
  channels: Channel[];
  onChannelSelect: (channelId: string) => void;
  selectedChannelId?: string;
}

export const ChannelGroup = memo(({ name, channels, onChannelSelect, selectedChannelId }: ChannelGroupProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { unreadChannels, mentionCounts } = useChannel();

  return (
    <div className="mb-2">
      {/* Category Header */}
      <button
        className="w-full px-1 flex items-center gap-1 text-xs font-semibold text-gray-400 hover:text-gray-300 uppercase tracking-wide group text-left"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <FiChevronRight 
          className={clsx(
            "w-3 h-3 transition-transform flex-shrink-0",
            isExpanded && "rotate-90"
          )} 
        />
        {name}
      </button>

      {/* Channel List */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {channels.map((channel) => (
              <button
                key={channel.id}
                className={clsx(
                  'w-full mt-1 px-2 py-1 flex items-center gap-2 rounded group text-left',
                  'hover:bg-[#393c43]',
                  selectedChannelId === channel.id ? 'bg-[#393c43] text-white' : 'text-gray-400'
                )}
                onClick={() => onChannelSelect(channel.id)}
              >
                {/* Channel Icon */}
                <div className="flex-shrink-0">
                  {channel.type === 'text' && (
                    <FiHash className={clsx(
                      'w-4 h-4',
                      unreadChannels.has(channel.id) && 'text-gray-200'
                    )} />
                  )}
                  {channel.type === 'voice' && <FiVolume2 className="w-4 h-4" />}
                  {channel.type === 'announcement' && <FiLock className="w-4 h-4" />}
                </div>

                {/* Channel Name */}
                <span className={clsx(
                  'text-sm truncate flex-1 text-left',
                  selectedChannelId === channel.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-300',
                  unreadChannels.has(channel.id) && 'font-semibold text-gray-200'
                )}>
                  {channel.name}
                </span>

                {/* Unread Indicator */}
                {unreadChannels.has(channel.id) && (
                  <div className="ml-auto flex items-center">
                    {mentionCounts.get(channel.id) ? (
                      <span className="px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">
                        {mentionCounts.get(channel.id)}
                      </span>
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-gray-200" />
                    )}
                  </div>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

// Add prop types checking
ChannelGroup.displayName = 'ChannelGroup'; 