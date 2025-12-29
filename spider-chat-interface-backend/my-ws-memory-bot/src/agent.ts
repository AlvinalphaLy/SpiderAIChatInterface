import { Agent, type Connection } from "agents";

type ChatState = {
  userName?: string;
  history?: Array<{ role: "user" | "assistant"; content: string; ts: number }>;
};

type Inbound =
  | { type: "user_message"; content: string }
  | { type: "set_name"; name: string };

type Outbound =
  | { type: "assistant_message"; content: string }
  | { type: "state"; state: ChatState }
  | { type: "error"; message: string };

// Minimal typing for Workers AI binding
type WorkersAI = {
  run: (model: string, input: any) => Promise<any>;
};

type AgentEnv = {
  AI: WorkersAI;
};

export class ChatbotAgentV3 extends Agent<ChatState> {
  // The Agents runtime passes env to the base class; we store it for use.
  private env: AgentEnv;

  constructor(state: DurableObjectState, env: AgentEnv) {
    super(state, env);
    this.env = env;
  }

  // Framework hook (Agents uses this to create initial state)
  initialState() {
    return { history: [] as ChatState["history"] };
  }

  private defaultState(): ChatState {
    return { history: [] };
  }

  async onConnect(conn: Connection) {
    const state = this.state ?? this.defaultState();
    await conn.send(JSON.stringify({ type: "state", state } satisfies Outbound));
  }

  async onMessage(conn: Connection, msg: string | ArrayBuffer | ArrayBufferView) {
    try {
      const text =
        typeof msg === "string" ? msg : new TextDecoder().decode(msg as ArrayBuffer);
      const data: Inbound = JSON.parse(text);

      const state = this.state ?? this.defaultState();
      const history = state.history ?? [];

      // Handle name setting
      if (data.type === "set_name") {
        await this.setState({ ...state, userName: data.name, history });
        await conn.send(
          JSON.stringify({ type: "state", state: this.state ?? state } satisfies Outbound)
        );
        return;
      }

      // Only accept user messages
      if (data.type !== "user_message") {
        await conn.send(
          JSON.stringify({ type: "error", message: "Unknown message type" } satisfies Outbound)
        );
        return;
      }

      const userText = data.content;

      // Add user message to history
      history.push({ role: "user", content: userText, ts: Date.now() });

      // Keep prompt small (last 12 turns)
      const trimmedForPrompt = history.slice(-12);

      // System instruction + conversation
      const promptMessages = [
        {
          role: "system",
          content:
            "You are Spider-Bot, a helpful assistant. Answer naturally. If you don't know, say so."
        },
        ...trimmedForPrompt.map((h) => ({ role: h.role, content: h.content }))
      ];

      // ✅ Workers AI call
      // Use a Cloudflare-hosted model identifier (recommended). If you prefer another model, we can swap.
      const aiResponse = await this.env.AI.run("@cf/meta/llama-3-8b-instruct", {
        messages: promptMessages,
        max_tokens: 300
      });

      // Different models return slightly different shapes; try common fields.
      const replyText =
        aiResponse?.response ??
        aiResponse?.result?.response ??
        aiResponse?.output_text ??
        "Sorry — I couldn't generate a response.";

      // Add assistant reply to history
      history.push({ role: "assistant", content: replyText, ts: Date.now() });

      // Persist last 20 messages
      await this.setState({ ...state, history: history.slice(-20) });

      // Send assistant message back to client
      await conn.send(
        JSON.stringify({ type: "assistant_message", content: replyText } satisfies Outbound)
      );
    } catch (e: any) {
      await conn.send(
        JSON.stringify({
          type: "error",
          message: e?.message ?? "Bad message"
        } satisfies Outbound)
      );
    }
  }
}
