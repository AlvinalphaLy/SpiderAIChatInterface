import SpiderBackground from '@/components/SpiderBackground';
import ChatWindow from '@/components/ChatWindow';

const Index = () => {
  return (
    <main className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Dynamic background */}
      <SpiderBackground />

      {/* Main content */}
      <div className="relative z-10 w-full">
        <ChatWindow />
      </div>

      {/* Footer branding */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
        <p className="text-xs text-muted-foreground/50 font-display tracking-wider">
          SPIDER-BOT v1.0
        </p>
      </div>
    </main>
  );
};

export default Index;
