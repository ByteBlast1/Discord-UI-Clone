import { useState, useRef, useEffect } from 'react';
import { Message } from '@/types/common';
import { mockCurrentUser, mockMessages } from '@/config/mockData';
import { formatDistanceToNow } from 'date-fns';
import { MessageInput } from './MessageInput';
import { motion, AnimatePresence } from 'framer-motion';
import { useChannel } from '@/contexts/ChannelContext';
import { useVirtualizer } from '@tanstack/react-virtual';

export const ChatArea = () => {
  const { currentChannel, addMessage } = useChannel();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: currentChannel?.messages.length || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
    overscan: 5
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentChannel) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      author: mockCurrentUser,
      timestamp: new Date().toISOString(),
    };

    addMessage(currentChannel.id, message);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Channel Header - Added left padding for mobile */}
      <div className="h-12 border-b border-[#202225] flex items-center">
        <div className="flex items-center pl-14 lg:pl-4">
          <span className="text-gray-400 mr-2">#</span>
          <h2 className="font-semibold text-white truncate">{currentChannel?.name}</h2>
        </div>
      </div>

      {/* Messages Area - Updated with virtualization */}
      <div ref={parentRef} className="flex-1 overflow-y-auto px-2 md:px-4 py-6">
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => (
            <div
              key={virtualRow.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <MessageItem message={currentChannel!.messages[virtualRow.index]} />
            </div>
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="px-2 md:px-4 pb-6">
        <MessageInput
          value={newMessage}
          onChange={setNewMessage}
          onSubmit={handleSendMessage}
          channelName={currentChannel?.name || ''}
        />
      </div>
    </div>
  );
};

interface MessageItemProps {
  message: Message;
}

const MessageItem = ({ message }: MessageItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="group flex hover:bg-[#32353b] -mx-2 md:-mx-4 p-2 md:p-4 rounded"
    >
      {/* User Avatar */}
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#5865f2] flex-shrink-0 mr-3 md:mr-4 overflow-hidden"
      >
        {message.author.avatar ? (
          <img
            src={message.author.avatar}
            alt={message.author.username}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white font-medium bg-[#5865f2]">
            {message.author.username[0].toUpperCase()}
          </div>
        )}
      </motion.div>

      {/* Message Content */}
      <div className="flex-1 min-w-0 overflow-hidden">
        <div className="flex items-baseline gap-2 flex-wrap">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-medium text-white truncate max-w-[150px] md:max-w-[200px]"
          >
            {message.author.username}
          </motion.span>
          <span className="text-xs text-gray-400 flex-shrink-0">
            {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
          </span>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-300 mt-1 break-words whitespace-pre-wrap"
        >
          {message.content}
        </motion.p>
      </div>
    </motion.div>
  );
}; 