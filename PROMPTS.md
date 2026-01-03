# AI Assistance & Prompts Used

This document outlines how AI-assisted coding tools were used during the development of this project.
AI was used as a productivity aid for brainstorming, refactoring, and validating design decisions.
All final architecture, integration, and debugging decisions were made by the author.

---

## 1. High-Level Architecture Design

**Purpose:**  
Explore how to design a real-time AI chat system using Cloudflare’s edge infrastructure.

**Prompt:**

> Design a real-time AI chat application using Cloudflare Workers, Durable Objects, and WebSockets.  
> The system should support per-user state, conversational memory, and low-latency communication.

**Outcome:**

- Confirmed that Durable Objects are a good fit for per-user conversational state
- Adopted a WebSocket-based architecture instead of HTTP polling
- Decided to separate routing logic from agent logic

---

## 2. AI Agent Structure and State Management

**Purpose:**  
Define how an AI agent should manage memory and message flow.

**Prompt:**

> How should an AI agent manage short-term conversational memory efficiently when using LLMs with context limits?

**Outcome:**

- Implemented a rolling window of recent messages
- Explicitly trimmed conversation history to control token usage
- Structured message history as `{ role, content, timestamp }`

---

## 3. Cloudflare Durable Objects Usage

**Purpose:**  
Validate Durable Objects as a stateful backend component.

**Prompt:**

> Explain when Durable Objects are preferred over stateless Workers for real-time applications.

**Outcome:**

- Confirmed suitability for per-user agents
- Used one Durable Object instance per user/session
- Avoided external databases for MVP simplicity

---

## 4. Workers AI Integration

**Purpose:**  
Integrate LLM inference using Cloudflare Workers AI.

**Prompt:**

> Show an example of calling Cloudflare Workers AI from a Worker and passing structured chat messages.

**Outcome:**

- Integrated Workers AI using the `env.AI.run()` API
- Constructed structured prompts with system and user messages
- Explicitly controlled output token limits

---

## 5. WebSocket Message Protocol Design

**Purpose:**  
Design a clean message contract between frontend and backend.

**Prompt:**

> Propose a simple JSON message protocol for WebSocket-based AI chat applications.

**Outcome:**

- Defined explicit message types (`user_message`, `assistant_message`, `state`, `error`)
- Ensured frontend ignores unknown/internal messages
- Improved robustness of the client-server contract

---

## 6. Frontend Integration & Error Handling

**Purpose:**  
Improve frontend reliability when handling WebSocket events.

**Prompt:**

> What are common pitfalls when consuming WebSocket messages in a React application?

**Outcome:**

- Added defensive JSON parsing
- Ignored non-user-facing system messages
- Handled connection lifecycle cleanly

---

## 7. Debugging & Refactoring Assistance

**Purpose:**  
Speed up debugging and refactoring without changing logic.

**Prompt:**

> Help refactor this TypeScript code to improve readability without changing behavior.

**Outcome:**

- Improved code clarity
- Reduced duplicated logic
- Maintained full control over final implementation

---

## 8. Documentation & Resume Wording

**Purpose:**  
Ensure clear project documentation and professional communication.

**Prompt:**

> Help rewrite this project description to be clear and professional for recruiters.

**Outcome:**

- Improved README clarity
- Clarified architectural decisions
- Maintained accuracy and technical ownership

---

## Notes on AI Usage

- AI was used as a **development assistant**, not an autonomous code generator.
- All architectural decisions, integration steps, and final code were reviewed and modified by the author.
- No proprietary or sensitive data was used in prompts.
- The project reflects the author’s understanding of distributed systems, real-time communication, and AI integration.

---

## Summary

AI-assisted coding enabled faster iteration and exploration of ideas, while the final system design, implementation, and debugging were driven by the author’s engineering judgment.
