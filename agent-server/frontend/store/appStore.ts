import { create } from "zustand";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
interface ToolEvent {
  tool_name: string;
  status: string;
}
interface AppState {
  connectionStatus: string;
  setConnectionStatus: (status: string) => void;

  lastSeq: number;
  setLastSeq: (seq: number) => void;

  messages: ChatMessage[];

  addMessage: (message: ChatMessage) => void;

  updateLastAssistantMessage: (text: string) => void;
  tools: ToolEvent[];
  
  addTool: (tool: ToolEvent) => void;

  updateToolStatus: ( toolName: string, status: string) => void;
  contexts: ContextSnapshot[];

  addContext: (context: ContextSnapshot) => void;
  timeline: TimelineEvent[];

  addTimelineEvent: (event: TimelineEvent) => void;
  selectedEvent: TimelineEvent | null;

setSelectedEvent: (
  event: TimelineEvent | null
) => void;

agentState: string;
setAgentState: (
  state: string
) => void;
 currentTool: string;
setCurrentTool: (
  tool: string
) => void;

currentStream: string;
setCurrentStream: (
  stream: string
) => void;

lastEventType: string;
setLastEventType: (
  type: string
) => void;
eventCount: number;
incrementEventCount: () => void;
}
interface ContextSnapshot {
  context_id: string;
  data: any;
}
interface TimelineEvent {
  seq: number;
  type: string;
  payload: any;
}

export const useAppStore = create<AppState>((set) => ({
  connectionStatus: "disconnected",

  setConnectionStatus: (status) =>
    set({ connectionStatus: status }),

  lastSeq: 0,

  setLastSeq: (seq) =>
    set({ lastSeq: seq }),

  messages: [],
  tools:[],
  contexts: [],
  timeline: [],
  selectedEvent: null,
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
     addTool: (tool) =>
  set((state) => ({
    tools: [...state.tools, tool],
  })),
  addContext: (context) =>
  set((state) => ({
    contexts: [...state.contexts, context],
  })),
  updateToolStatus: (toolName, status) =>
  set((state) => ({
    tools: state.tools.map((tool) =>
      tool.tool_name === toolName
        ? { ...tool, status }
        : tool
    ),
  })),
  addTimelineEvent: (event) =>
  set((state) => ({
    timeline: [...state.timeline, event],
  })),
  setSelectedEvent: (event) =>
  set({
    selectedEvent: event,
  }),

  agentState: "Idle",
setAgentState: (state) =>
  set({
    agentState: state,
  }),
  currentTool: "",

setCurrentTool: (tool) =>
  set({
    currentTool: tool,
  }),

currentStream: "",

setCurrentStream: (stream) =>
  set({
    currentStream: stream,
  }),

lastEventType: "",

setLastEventType: (type) =>
  set({
    lastEventType: type,
  }),
  eventCount: 0,

incrementEventCount: () =>
  set((state) => ({
    eventCount: state.eventCount + 1,
  })),
  updateLastAssistantMessage: (text) =>
    set((state) => {
      const msgs = [...state.messages];

      if (
        msgs.length > 0 &&
        msgs[msgs.length - 1].role === "assistant"
      ) {
        msgs[msgs.length - 1].content += text;
      } else {
        msgs.push({
          role: "assistant",
          content: text,
        });
      }

      return { messages: msgs };
    }),
}));