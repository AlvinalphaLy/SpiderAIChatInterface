import { routeAgentRequest, type AgentNamespace } from "agents";
import { ChatbotAgentV3 } from "./agent";

export { ChatbotAgentV3 };

type Env = {
  CHATBOT: AgentNamespace<ChatbotAgentV3>;
  AI: any; // Workers AI binding
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const routed = await routeAgentRequest(request, env);
    if (routed) return routed;

    return new Response("Backend OK. Connect WS at /agents/chatbot/<userId>");
  }
};
