import { MainLayout } from '@/components/layout/MainLayout';
import { ChatArea } from '@/components/features/chat/ChatArea';
import { ChannelProvider } from '@/contexts/ChannelContext';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <ChannelProvider>
        <MainLayout>
          <ChatArea />
        </MainLayout>
      </ChannelProvider>
    </ErrorBoundary>
  );
}

export default App; 