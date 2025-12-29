import SpiderBotAvatar from './SpiderBotAvatar';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: string;
}

const ChatMessage = ({ message, isBot, timestamp }: ChatMessageProps) => {
  return (
    <div
      className={`flex gap-3 animate-slide-up ${
        isBot ? 'flex-row' : 'flex-row-reverse'
      }`}
    >
      {/* Avatar */}
      {isBot ? (
        <SpiderBotAvatar size="sm" />
      ) : (
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
          <span className="text-xs font-semibold text-secondary-foreground">You</span>
        </div>
      )}

      {/* Message bubble */}
      <div className={`flex flex-col max-w-[75%] ${isBot ? 'items-start' : 'items-end'}`}>
        <div
          className={`px-4 py-3 rounded-2xl ${
            isBot
              ? 'glass-card rounded-tl-sm text-foreground'
              : 'spider-gradient text-primary-foreground rounded-tr-sm'
          }`}
        >
          <p className="text-sm leading-relaxed">{message}</p>
        </div>
        <span className="text-xs text-muted-foreground mt-1 px-2">{timestamp}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
