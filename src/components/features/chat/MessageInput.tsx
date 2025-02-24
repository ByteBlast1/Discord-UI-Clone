import { useState } from 'react';
import { FiPaperclip, FiGift, FiImage, FiSmile } from 'react-icons/fi';

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  channelName: string;
}

export const MessageInput = ({
  value,
  onChange,
  onSubmit,
  channelName,
}: MessageInputProps) => {
  const [isComposing, setIsComposing] = useState(false);

  return (
    <form onSubmit={onSubmit} className="relative">
      <div className="flex items-center bg-[#40444b] rounded-lg px-2 md:px-4">
        {/* Upload Button - Hidden on mobile */}
        <button
          type="button"
          className="hidden md:block p-2 hover:text-white text-gray-400 rounded-lg"
        >
          <FiPaperclip className="w-5 h-5" />
        </button>

        {/* Text Input */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          className="flex-1 bg-transparent py-2.5 px-2 md:px-3 text-sm md:text-base text-gray-200 placeholder-gray-400 focus:outline-none"
          placeholder={`Message #${channelName}`}
        />

        {/* Action Buttons */}
        <div className="flex items-center space-x-1 md:space-x-2">
          <button
            type="button"
            className="p-1 md:p-2 hover:text-white text-gray-400 rounded-lg"
          >
            <FiImage className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="p-1 md:p-2 hover:text-white text-gray-400 rounded-lg"
          >
            <FiSmile className="w-5 h-5" />
          </button>
        </div>
      </div>
    </form>
  );
}; 