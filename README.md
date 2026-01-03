## 🎬 Demo

[![Watch the demo](https://img.youtube.com/vi/RqlTGsb4JtA/0.jpg)](https://youtu.be/RqlTGsb4JtA)

Watch the demo on YouTube: https://youtu.be/RqlTGsb4JtA

---

SpiderBot AI — a real-time AI agent chat platform using Cloudflare Workers AI, Durable Objects, and WebSockets.

### Key Design Decisions

## Why Cloudflare

This project was intentionally built on Cloudflare to leverage features that are difficult to replicate with traditional serverless platforms.

- **Workers** enable low-latency execution close to users without managing servers.
- **Durable Objects** provide strongly consistent, per-user state, making them ideal for AI agents with conversational memory.
- **Workers AI** allows LLM inference at the edge without managing API keys or external model providers.
- **WebSocket support** in Workers enables real-time, bidirectional communication in a serverless environment.

These primitives together enable a real-time, stateful AI agent architecture that aligns closely with Cloudflare’s edge-first design philosophy.

---

Each user is routed to a dedicated Durable Object instance, which acts as a stateful AI agent.
This ensures strong consistency for conversational memory while allowing horizontal scaling across users.

## Cost & Usage Notes

- Workers AI calls are executed remotely and may incur usage costs.
- Conversation history is intentionally trimmed to control token usage.
- The project avoids unrestricted model access and does not grant the LLM direct internet access.

## 🧰 Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

### Backend

- Cloudflare Workers
- Cloudflare Durable Objects
- Cloudflare Workers AI
- WebSockets
- TypeScript

---

## 📁 Project Structure

.
├─ spider-chat-interface-frontend/ # Frontend (React)
│ ├─ src/
│ └─ package.json
│
├─ spider-chat-interface-backend/
│ └─ my-ws-memory-bot/ # Backend (Cloudflare Worker)
│ ├─ src/
│ │ ├─ index.ts
│ │ └─ agent.ts
│ ├─ wrangler.jsonc
│ └─ package.json

---

## 🛠️ Running Locally

### Prerequisites

- Node.js (18+)
- npm
- Cloudflare account (for Workers AI)

---

### 1️⃣ Backend

```bash
cd spider-chat-interface-backend/my-ws-memory-bot
npm install
npm run dev
```

The backend worker typically runs on:

http://127.0.0.1:8787

### 2️⃣ Frontend

```bash
cd spider-chat-interface-frontend
npm install
npm run dev
```

Open the app in your browser (Vite default):

http://localhost:8080

🧪 Example WebSocket Test

```bash
npx wscat -c ws://127.0.0.1:8787/agents/chatbot/demo-user
```

Send a user message payload:

```json
{ "type": "user_message", "content": "Hello!" }
```

📌 Future Improvements

- Long-term chat storage (D1 or SQLite analytics)
- Tool calling (search, APIs, RAG)
- Streaming token responses
- Authentication and rate limiting
- Multi-conversation chat sessions

---
