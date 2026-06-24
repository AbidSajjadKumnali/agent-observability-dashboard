export type ConnectionStatus =
  | "connecting"
  | "connected"
  | "disconnected";

export interface TimelineEvent {
  seq: number;
  type: string;
  timestamp: number;
  payload: any;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface ToolCall {
  callId: string;
  toolName: string;
  status: "pending" | "completed";
  result?: any;
}