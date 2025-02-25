// import { useState } from 'react';
import { FiPaperclip, FiImage, FiSmile, FiSend } from 'react-icons/fi';
import { useState, useRef, useEffect } from 'react';

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
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isComposingMessage = value.trim().length > 0;

  // Auto focus input on mobile when tapping the form area
  const handleFormClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus the input when pressing / when not already focused
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <form 
      onSubmit={onSubmit} 
      className="relative" 
      onClick={handleFormClick}
    >
      <div className={`
        flex items-center bg-[#40444b] rounded-lg overflow-hidden
        transition-all duration-200
        ${isFocused ? 'ring-1 ring-[#5865F2]/70' : ''}
      `}>
        {/* Upload Button - Hidden on smaller screens */}
        <button
          type="button"
          className="hidden md:flex items-center justify-center p-2 hover:text-white text-gray-400 rounded-lg"
          aria-label="Attach files"
        >
          <FiPaperclip className="w-5 h-5" />
        </button>

        {/* Text Input */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 bg-transparent h-10 py-2 px-2 md:px-3 text-sm md:text-base text-gray-200 placeholder-gray-400 focus:outline-none"
          placeholder={`Message #${channelName || 'channel'}`}
          aria-label={`Type a message for ${channelName}`}
        />

        {/* Action Buttons */}
        <div className="flex items-center">
          <button
            type="button"
            className="p-1 md:p-2 hover:text-white text-gray-400 rounded-lg"
            aria-label="Add emoji"
          >
            <FiSmile className="w-5 h-5" />
          </button>
          
          <button
            type="button"
            className="p-1 md:p-2 hover:text-white text-gray-400 rounded-lg"
            aria-label="Upload image"
          >
            <FiImage className="w-5 h-5" />
          </button>
          
          {/* Send button - Shows when typing */}
          {isComposingMessage && (
            <button
              type="submit"
              className="p-1 md:p-2 text-white bg-[#5865F2] hover:bg-[#4752c4] rounded-lg mx-1"
              aria-label="Send message"
            >
              <FiSend className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
      
      {/* Keyboard shortcut hint */}
      <div className="hidden md:block absolute -bottom-5 right-2 text-xs text-gray-500">
        Press / to focus
      </div>
    </form>
  );
}; 