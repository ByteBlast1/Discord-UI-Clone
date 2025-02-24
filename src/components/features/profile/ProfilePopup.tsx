import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, BadgeType } from '@/types/common';
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa';
import { 
  FiCircle, 
  FiMoon, 
  FiClock, 
  FiMinusCircle,
  FiSettings,
  FiUser,
  FiLogOut,
} from 'react-icons/fi';
import { getBadgeIcon } from '@/lib/badges';
import { LoadingAnimation } from '@/components/common/LoadingAnimation';
import clsx from 'clsx';

interface ProfilePopupProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  anchorEl?: HTMLElement | null;
}

const statusOptions = [
  { id: 'online', label: 'Online', icon: FiCircle, color: 'text-green-500' },
  { id: 'idle', label: 'Idle', icon: FiMoon, color: 'text-yellow-500' },
  { id: 'dnd', label: 'Do Not Disturb', icon: FiMinusCircle, color: 'text-red-500' },
  { id: 'invisible', label: 'Invisible', icon: FiCircle, color: 'text-gray-500' },
];

export const ProfilePopup = ({ user, isOpen, onClose, anchorEl }: ProfilePopupProps) => {
  const [activeTab, setActiveTab] = useState<'user' | 'mutual'>('user');
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = window.innerWidth < 768; // Simple mobile detection

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      // Simulate loading delay
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Calculate position based on anchor element and screen size
  const getPopupPosition = () => {
    if (!anchorEl) return {};
    const rect = anchorEl.getBoundingClientRect();
    
    if (isMobile) {
      return {
        bottom: '0',
        left: '0',
        right: '0',
        maxHeight: '90vh',
      };
    }

    return {
      bottom: `${window.innerHeight - rect.top + 16}px`,
      left: `${rect.left - (340 / 2) + (rect.width / 2)}px`,
    };
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50"
            onClick={onClose}
          />

          {/* Popup */}
          <motion.div
            initial={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 20 }}
            animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }}
            exit={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            style={getPopupPosition()}
            className={clsx(
              "fixed z-[70] bg-[#232428] shadow-xl overflow-hidden",
              isMobile ? "w-full rounded-t-xl" : "w-[340px] rounded-lg"
            )}
          >
            {isLoading ? (
              <div className="h-[400px] flex items-center justify-center">
                <LoadingAnimation />
              </div>
            ) : (
              <>
                {/* Header with banner */}
                <div className="h-[60px] bg-[#5865F2]" />

                {/* Profile content */}
                <div className="px-4 pb-2">
                  {/* Avatar and badges */}
                  <div className="relative -mt-[30px] mb-3 flex items-end">
                    <button 
                      className="relative group"
                      onClick={() => setShowStatusMenu(!showStatusMenu)}
                    >
                      <div className="w-[70px] h-[70px] rounded-full border-4 border-[#232428] overflow-hidden bg-[#18191c]">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.username}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl font-semibold text-white">
                            {user.username[0].toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#232428] rounded-full flex items-center justify-center">
                        <div className={`w-4 h-4 rounded-full ${
                          user.status === 'online' ? 'bg-green-500' :
                          user.status === 'idle' ? 'bg-yellow-500' :
                          user.status === 'dnd' ? 'bg-red-500' : 'bg-gray-500'
                        }`} />
                      </div>
                    </button>
                    {user.badges && user.badges.length > 0 && (
                      <div className="flex gap-1.5 ml-2 mb-1">
                        {user.badges.map((badge) => (
                          <div
                            key={badge}
                            className="w-6 h-6 bg-[#18191c] rounded-full flex items-center justify-center"
                            title={badge}
                          >
                            {getBadgeIcon(badge)}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Username and discriminator */}
                  <div className="bg-[#111214] rounded-lg p-3">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-1">
                      {user.username}
                      {user.discriminator && (
                        <span className="text-gray-400">#{user.discriminator}</span>
                      )}
                    </h3>
                    {user.customStatus && (
                      <p className="text-gray-300 text-sm mt-1">{user.customStatus}</p>
                    )}
                  </div>

                  {/* Status Menu */}
                  <AnimatePresence>
                    {showStatusMenu && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 bg-[#111214] rounded-lg overflow-hidden"
                      >
                        {statusOptions.map((option) => (
                          <button
                            key={option.id}
                            className="w-full px-3 py-2 flex items-center gap-3 hover:bg-[#18191c] text-left"
                            onClick={() => setShowStatusMenu(false)}
                          >
                            <option.icon className={`w-4 h-4 ${option.color}`} />
                            <span className="text-gray-300 text-sm">{option.label}</span>
                          </button>
                        ))}
                        <div className="px-3 py-2 border-t border-[#18191c]">
                          <button className="w-full px-2 py-1 text-sm text-gray-300 hover:underline text-left">
                            Clear Status
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Action Buttons */}
                  <div className="mt-2 space-y-0.5">
                    <button className="w-full px-3 py-2 flex items-center gap-3 hover:bg-[#18191c] rounded">
                      <FiUser className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300 text-sm">Set Profile</span>
                    </button>
                    <button className="w-full px-3 py-2 flex items-center gap-3 hover:bg-[#18191c] rounded">
                      <FiSettings className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300 text-sm">User Settings</span>
                    </button>
                    <button className="w-full px-3 py-2 flex items-center gap-3 hover:bg-[#18191c] rounded">
                      <FiClock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300 text-sm">Set Custom Status</span>
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="my-2 border-t border-[#18191c]" />

                  {/* Logout Button */}
                  <button className="w-full px-3 py-2 flex items-center gap-3 hover:bg-[#18191c] rounded text-red-400 hover:text-red-500">
                    <FiLogOut className="w-4 h-4" />
                    <span className="text-sm">Log Out</span>
                  </button>

                  {/* Mobile close button */}
                  {isMobile && (
                    <button
                      className="absolute top-3 right-3 text-gray-400 hover:text-white"
                      onClick={onClose}
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}; 