### Key Design Decisions

- **Durable Objects** provide isolated, per-user state and memory.
- **WebSockets** enable real-time, streaming-style interaction.
- **Workers AI** runs LLM inference close to users, reducing latency.
- **Short-term memory** is kept small for efficiency, mirroring production LLM systems.

---

## 🧰 Tech Stack

### Frontend

### Key Design Decisions

- **Durable Objects** provide isolated, per-user state and memory.
- **WebSockets** enable real-time, streaming-style interaction.
- **Workers AI** runs LLM inference close to users, reducing latency.
- **Short-term memory** is kept small for efficiency, mirroring production LLM systems.

---

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
