import { MainLayout } from '@/components/layout/MainLayout';
import { ChatArea } from '@/components/features/chat/ChatArea';
import { mockServers, mockCurrentUser } from '@/config/mockData';
import { ChannelProvider } from '@/contexts/ChannelContext';

function App() {
  return (
    <ChannelProvider>
      <MainLayout>
        <ChatArea />
      </MainLayout>
    </ChannelProvider>
  );
}

export default App; 