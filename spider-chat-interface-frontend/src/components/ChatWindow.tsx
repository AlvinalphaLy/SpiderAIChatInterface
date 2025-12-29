import { useAgent } from "../hooks/useAgent";
import { useState, useRef, useEffect } from "react";
import { Zap } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import SpiderBotAvatar from "./SpiderBotAvatar";

const getCurrentTime = () => {
  return new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const ChatWindow = () => {
  const { messages, send, connect, disconnect, connected } =
    useAgent("demo-user");
  const isTyping = false;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (ts?: number) =>
    ts
      ? new Date(ts).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      : getCurrentTime();

  // send() from `useAgent` will add user messages and forward to the agent

  return (
    <div className="relative w-full max-w-2xl mx-auto h-[80vh] flex flex-col">
      {/* Header */}
      <div className="glass-card rounded-t-2xl p-4 border-b border-border/30">
        <div className="flex items-center gap-4">
          <SpiderBotAvatar size="lg" />
          <div className="flex-1">
            <h1 className="font-display text-xl font-bold text-gradient">
              Spider-Bot
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-muted-foreground">
                Online • Ready to help
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary">AI Powered</span>
          </div>
          <div className="ml-3">
            <button
              onClick={() => (connected ? disconnect() : connect())}
              className="px-3 py-1 rounded-md bg-primary text-primary-foreground text-sm"
            >
              {connected ? "Disconnect" : "Connect"}
            </button>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 glass-card border-x border-border/30">
        {messages.length === 0 && (
          <ChatMessage
            message={
              "Hi! Click Connect, then send a message.\nTip: type `name: Alvin` to set memory."
            }
            isBot
            timestamp={getCurrentTime()}
          />
        )}

        {messages.map((m: any) => (
          <ChatMessage
            key={m.id}
            message={m.content}
            isBot={m.role === "assistant"}
            timestamp={formatTime(m.ts)}
          />
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-3 animate-fade-in">
            <SpiderBotAvatar size="sm" />
            <div className="glass-card px-4 py-3 rounded-2xl rounded-tl-sm">
              <div className="flex gap-1">
                <span
                  className="w-2 h-2 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="glass-card rounded-b-2xl p-4 border-t border-border/30">
        <ChatInput onSend={send} disabled={!connected} />
      </div>

      {/* Decorative corner webs */}
      <div className="absolute -top-4 -left-4 w-16 h-16 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
          <path
            d="M0 0 L100 0 L0 100 Z"
            fill="currentColor"
            fillOpacity="0.1"
          />
          <path d="M0 0 L100 0" stroke="currentColor" strokeWidth="1" />
          <path d="M0 0 L0 100" stroke="currentColor" strokeWidth="1" />
          <path d="M0 0 L70 70" stroke="currentColor" strokeWidth="0.5" />
          <path d="M0 0 L50 85" stroke="currentColor" strokeWidth="0.5" />
          <path d="M0 0 L85 50" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="absolute -bottom-4 -right-4 w-16 h-16 opacity-20 rotate-180">
        <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
          <path
            d="M0 0 L100 0 L0 100 Z"
            fill="currentColor"
            fillOpacity="0.1"
          />
          <path d="M0 0 L100 0" stroke="currentColor" strokeWidth="1" />
          <path d="M0 0 L0 100" stroke="currentColor" strokeWidth="1" />
          <path d="M0 0 L70 70" stroke="currentColor" strokeWidth="0.5" />
          <path d="M0 0 L50 85" stroke="currentColor" strokeWidth="0.5" />
          <path d="M0 0 L85 50" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>
    </div>
  );
};

export default ChatWindow;
