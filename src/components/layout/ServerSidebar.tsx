import { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { DISCORD_CONSTANTS } from '@/config/constants';
import { mockServers } from '@/config/mockData';
import { FaDiscord } from 'react-icons/fa';

interface ServerSidebarProps {
  onItemClick?: () => void;
}

export const ServerSidebar = ({ onItemClick }: ServerSidebarProps) => {
  const [selectedServer, setSelectedServer] = useState<string | null>(null);

  const handleServerClick = (serverId: string | null) => {
    setSelectedServer(serverId);
    onItemClick?.();
  };

  return (
    <nav
      className="flex flex-col items-center bg-[#202225] py-3 h-screen"
      style={{ width: DISCORD_CONSTANTS.SIDEBAR.WIDTH }}
    >
      {/* Home Button */}
      <ServerButton
        isHome
        isSelected={selectedServer === null}
        onClick={() => handleServerClick(null)}
      >
        <FaDiscord className="w-7 h-5 text-white" />
      </ServerButton>

      {/* Divider with more spacing */}
      <div className="w-8 h-0.5 bg-[#36393f] rounded-full mx-auto my-4" />

      {/* Make the server list scrollable on small screens */}
      <div className="flex-1 overflow-y-auto w-full px-2">
        <div className="flex flex-col space-y-3">
          {mockServers.map((server) => (
            <ServerButton
              key={server.id}
              isSelected={selectedServer === server.id}
              onClick={() => handleServerClick(server.id)}
            >
              {server.icon ? (
                <img
                  src={server.icon}
                  alt={server.name}
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#36393f] flex items-center justify-center">
                  <span className="text-white text-lg">
                    {server.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
              )}
            </ServerButton>
          ))}
        </div>
      </div>
    </nav>
  );
};

interface ServerButtonProps {
  children: ReactNode;
  isSelected?: boolean;
  isHome?: boolean;
  onClick?: () => void;
}

const ServerButton = ({ children, isSelected, isHome, onClick }: ServerButtonProps) => {
  return (
    <button
      className="relative group w-12 h-12 flex items-center justify-center"
      onClick={onClick}
    >
      {/* Server Pill Indicator */}
      <motion.div
        initial={false}
        animate={{
          height: isSelected ? '40px' : '8px',
          opacity: isSelected ? 1 : 0
        }}
        className="absolute left-0 w-1 bg-white rounded-r-full"
      />

      {/* Server Icon */}
      <motion.div
        whileHover={{ borderRadius: '16px' }}
        className={clsx(
          'w-12 h-12 flex items-center justify-center transition-all duration-200',
          isHome ? 'rounded-2xl' : 'rounded-[24px]',
          isSelected ? 'rounded-2xl bg-[#5865F2]' : 'bg-[#36393f]'
        )}
        style={{
          transition: 'background-color 0.2s, border-radius 0.2s'
        }}
      >
        {children}
      </motion.div>
    </button>
  );
}; 