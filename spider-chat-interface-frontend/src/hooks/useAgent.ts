import { useRef, useState } from "react";
import { connectAgent } from "../lib/agentClient";
import type { ServerMessage } from "../lib/agentTypes";

export type ChatItem = {
  id: string;
  role: "user" | "assistant";
  content: string;
  ts?: number;
};

function uid() {
  return Math.random().toString(16).slice(2);
}

export function useAgent(userId: string) {
  const agentRef = useRef<ReturnType<typeof connectAgent> | null>(null);
  const [messages, setMessages] = useState<ChatItem[]>([]);
  const [connected, setConnected] = useState(false);
  const [userName, setUserName] = useState<string | undefined>();

  function connect() {
    agentRef.current?.close();

    console.debug("useAgent.connect: connecting", { userId });

    agentRef.current = connectAgent(userId, (msg: ServerMessage) => {
      if (msg.type === "assistant_message") {
        setMessages((m) => [
          ...m,
          {
            id: uid(),
            role: "assistant",
            content: msg.content,
            ts: Date.now(),
          },
        ]);
      }
      if (msg.type === "state") {
        setUserName(msg.state.userName);
      }
      if (msg.type === "error") {
        setMessages((m) => [
          ...m,
          {
            id: uid(),
            role: "assistant",
            content: `⚠ ${msg.message}`,
            ts: Date.now(),
          },
        ]);
      }
    });

    // react to socket lifecycle events instead of assuming connection
    const sock = (agentRef.current as any)?.socket as WebSocket | undefined;
    if (sock) {
      sock.onopen = () => {
        console.debug("useAgent: socket onopen");
        setConnected(true);
      };
      sock.onclose = (ev) => {
        console.debug("useAgent: socket onclose", ev?.code, ev?.reason);
        setConnected(false);
      };
      sock.onerror = (ev) => {
        console.error("useAgent: socket onerror", ev);
        setMessages((m) => [
          ...m,
          {
            id: uid(),
            role: "assistant",
            content: "⚠ WebSocket error",
            ts: Date.now(),
          },
        ]);
      };
    }
  }

  function disconnect() {
    agentRef.current?.close();
    agentRef.current = null;
    setConnected(false);
  }

  function send(text: string) {
    if (!agentRef.current) return;

    setMessages((m) => [
      ...m,
      { id: uid(), role: "user", content: text, ts: Date.now() },
    ]);

    const nameMatch = text.match(/^name:\s*(.+)$/i);
    if (nameMatch) {
      agentRef.current.send({ type: "set_name", name: nameMatch[1].trim() });
      return;
    }

    agentRef.current.send({ type: "user_message", content: text });
  }

  return {
    messages,
    send,
    connect,
    disconnect,
    connected,
    userName,
  };
}
