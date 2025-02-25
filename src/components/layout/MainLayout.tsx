import { ReactNode, useState, useEffect } from 'react';
import { ServerSidebar } from './ServerSidebar';
import { ChannelSidebar } from './ChannelSidebar';
import { FiMenu, FiX } from 'react-icons/fi';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Track window resize to handle responsive behaviors
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Automatically close mobile menu when going to desktop size
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClose = () => {
    setIsMobileMenuOpen(false);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen && windowWidth < 1024) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen, windowWidth]);

  return (
    <div className="flex h-screen bg-[#36393f] overflow-hidden">
      {/* Mobile Menu Button - Adjusted position when open */}
      <button
        className={`
          lg:hidden fixed z-[80] p-2 rounded-md
          ${isMobileMenuOpen 
            ? 'top-2.5 right-3 bg-[#36393f]' // Move to right side when open
            : 'top-2.5 left-3 bg-[#202225]'  // Stay on left side when closed
          }
          transition-all duration-200
        `}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMobileMenuOpen ? (
          <FiX className="w-6 h-6 text-white" />
        ) : (
          <FiMenu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Server Sidebar */}
      <div
        className={`
          fixed lg:static h-full 
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0
          transition-transform duration-300 ease-in-out
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
          transition-transform duration-300 ease-in-out
          z-[30]
        `}
      >
        <ChannelSidebar onItemClick={handleClose} />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col w-full lg:w-auto relative overflow-hidden">
        {children}
      </main>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={handleClose}
          aria-label="Close menu overlay"
        />
      )}
    </div>
  );
}; 