import { ReactNode, useState } from 'react';
import { ServerSidebar } from './ServerSidebar';
import { ChannelSidebar } from './ChannelSidebar';
import { DISCORD_CONSTANTS } from '@/config/constants';
import { FiMenu } from 'react-icons/fi';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#36393f] overflow-hidden">
      {/* Mobile Menu Button - Adjusted positioning */}
      <button
        className={`
          lg:hidden fixed top-2.5 left-3 z-[80] p-2 bg-[#202225] rounded-md
          transition-opacity duration-200
          ${isMobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        `}
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <FiMenu className="w-6 h-6 text-white" />
      </button>

      {/* Server Sidebar */}
      <div
        className={`
          fixed lg:static h-full
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          transition-transform duration-200 ease-in-out
          z-[40]
        `}
      >
        <ServerSidebar onItemClick={handleClose} />
      </div>

      {/* Channel Sidebar */}
      <div
        className={`
          fixed lg:static h-full
          ${isMobileMenuOpen ? 'translate-x-[72px]' : '-translate-x-full'}
          lg:translate-x-0
          transition-transform duration-200 ease-in-out
          z-[30]
        `}
      >
        <ChannelSidebar onItemClick={handleClose} />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col w-full lg:w-auto relative">
        {children}
      </main>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={handleClose}
        />
      )}
    </div>
  );
}; 