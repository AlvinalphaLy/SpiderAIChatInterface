export type ClientMessage =
  | { type: "user_message"; content: string }
  | { type: "set_name"; name: string };

export type ServerMessage =
  | { type: "assistant_message"; content: string }
  | { type: "state"; state: { userName?: string } }
  | { type: "error"; message: string };
