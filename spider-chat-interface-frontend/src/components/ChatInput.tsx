import { useState, KeyboardEvent } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative">
      {/* Glow effect behind input */}
      <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-xl" />
      
      <div className="relative flex items-center gap-3 p-2 glass-card rounded-2xl border border-border/50">
        {/* Sparkle icon */}
        <div className="pl-3">
          <Sparkles className="w-5 h-5 text-primary animate-pulse" />
        </div>

        {/* Input field */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Spider-Bot anything..."
          disabled={disabled}
          className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-sm py-2"
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className="group relative p-3 rounded-xl spider-gradient transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 glow-effect"
        >
          <Send className="w-5 h-5 text-primary-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          
          {/* Button glow on hover */}
          <div className="absolute inset-0 rounded-xl bg-primary/50 blur-md opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
