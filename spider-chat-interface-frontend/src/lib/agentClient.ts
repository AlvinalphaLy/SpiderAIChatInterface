import type { ClientMessage, ServerMessage } from "./agentTypes";

export type AgentConnection = {
  send: (msg: ClientMessage) => void;
  close: () => void;
  socket: WebSocket;
};

export function connectAgent(
  userId: string,
  onMessage: (msg: ServerMessage) => void
): AgentConnection {
  const proto = location.protocol === "https:" ? "wss" : "ws";

  // During dev, Vite proxies /agents -> http://127.0.0.1:8787 (and ws: true)
  const ws = new WebSocket(
    `${proto}://${location.host}/agents/chatbot/${encodeURIComponent(userId)}`
  );

  ws.onmessage = (ev) => {
    let data: any;

    try {
      data = JSON.parse(ev.data);
    } catch {
      // Ignore non-JSON messages
      return;
    }

    // Ignore Cloudflare Agents internal system messages
    if (data?.type === "cf_agent_mcp_servers") {
      return;
    }

    onMessage(data);
  };

  ws.onerror = () => {
    onMessage({ type: "error", message: "WebSocket error" });
  };

  return {
    send(msg: ClientMessage) {
      ws.send(JSON.stringify(msg));
    },
    close() {
      ws.close();
    },
    socket: ws,
  };
}
