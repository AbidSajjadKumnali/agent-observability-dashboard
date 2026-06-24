"use client";

import { useEffect, useRef, useState } from "react";
import ConnectionBadge from "@/components/ConnectionBadge";
import { WebSocketManager } from "@/services/websocket";
import { useAppStore } from "@/store/appStore";
import ChatPanel from "@/components/ChatPanel";
import ToolPanel from "@/components/ToolPanel";
import ContextPanel from "@/components/ContextPanel";
import TimelinePanel from "@/components/TimelinePanel";
import SequenceHealth from "@/components/SequenceHealth";
import StatsCards from "@/components/StatsCards";
import EventInspector from "@/components/EventInspector";
import ExportButton from "@/components/ExportButton";
import EventAnalytics from "@/components/EventAnalytics"
import AgentStatus from "@/components/AgentStatus";

export default function Home() {
  const { connectionStatus, setConnectionStatus , messages, addMessage, updateLastAssistantMessage,
    tools,
    addTool,
    updateToolStatus,
    contexts,
    addContext,
    timeline,
    addTimelineEvent,
    selectedEvent,
    agentState,
setAgentState,


currentTool,
setCurrentTool,

currentStream,
setCurrentStream,

lastEventType,
setLastEventType,
eventCount,
incrementEventCount,

   } = useAppStore();
  const [input, setInput] = useState("");
  const exportData = {
  messages,
  tools,
  contexts,
  timeline,
};
  const wsRef = useRef<WebSocketManager | null>(null);

  useEffect(() => {
    const manager = new WebSocketManager();

    wsRef.current = manager;

    setConnectionStatus("connecting");

    manager.connect(
      () => {
        setConnectionStatus("connected");
      },

      (data) => {
        console.log("Server Event:", data);
        if(data.type === "TOKEN"){
          setAgentState("Streaming");
          setLastEventType(data.type);
          incrementEventCount();
            console.log("Server Event:", data);
          if(data.stream_id){
              setCurrentStream(data.stream_id);
          }
          updateLastAssistantMessage(data.text);
        }

        if (data.type === "TOOL_CALL") {
            setAgentState("Tool Running");
            setCurrentTool(data.tool_name);
            setLastEventType(data.type);
            incrementEventCount();
            console.log("Server Event:", data);

            addTool({
                    tool_name: data.tool_name,status: "running",});
        }

        if (data.type === "TOOL_RESULT") {
          setLastEventType(data.type);
          incrementEventCount();
            console.log("Server Event:", data);
           updateToolStatus(
            data.tool_name || "lookup_metric",
            "completed"
            );
          }

        if (data.type === "CONTEXT_SNAPSHOT") {
          setAgentState("Loading Context");
          setLastEventType(data.type);
          incrementEventCount();
            console.log("Server Event:", data);
          addContext({
          context_id: data.context_id,
          data: data.data,
        });
        }   

       if (data.type === "STREAM_END") {
          setAgentState("Idle");
          setLastEventType(data.type);
          incrementEventCount();
            console.log("Server Event:", data);
          setCurrentTool("");
        }

      if (data.seq) {
          addTimelineEvent({
          seq: data.seq,
          type: data.type,
          payload:data,
         });
        }
},

      () => {
        setConnectionStatus("disconnected");
      }
    );
  }, [setConnectionStatus,
    updateLastAssistantMessage,
    addTool,
    updateToolStatus,
  ]);

  const sendMessage = () => {
    if(!input.trim()) return;
    addMessage({
    role: "user",
    content: input,
    });

    wsRef.current?.send({
      type: "USER_MESSAGE",
      content: input,
    });
    setInput("")
  };

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold  mb-6">
        Alchemyst AI Dashboard
      </h1>
       
      <ConnectionBadge status={connectionStatus} />
      <AgentStatus
          state={agentState}
          tool={currentTool}
          stream={currentStream}
          lastEvent={lastEventType}
          eventCount={eventCount}

/>
       <StatsCards
  messages={messages.length}
  tools={tools.length}
  contexts={contexts.length}
  events={timeline.length}
/>
   <div className="mt-4">
  <ExportButton data={exportData} />

      <div className="mt-4 flex gap-2">
  <input
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder="Type a message..."
    className="border rounded px-3 py-2 text-black bg-white flex-1"
  />

  <button
    onClick={sendMessage}
    className="rounded bg-white text-black  px-4 py-2"
  >
    Send
  </button>
</div>
      <ChatPanel messages={messages} />
      <ToolPanel tools={tools} />
      <ContextPanel contexts={contexts} />
      <TimelinePanel timeline={timeline} />
      <EventInspector event={selectedEvent} />
      <SequenceHealth timeline={timeline} />
      <EventAnalytics timeline={timeline} />
      
  
</div>
     
      
    </main>
  );
}