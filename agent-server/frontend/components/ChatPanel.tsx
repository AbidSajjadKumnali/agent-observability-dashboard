"use client";

import { useEffect, useRef } from "react";

interface Message {
  role: string;
  content: string;
}

export default function ChatPanel({
  messages,
}: {
  messages: Message[];
}) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   bottomRef.current?.scrollIntoView({
  //     behavior: "smooth",
  //   });
  // }, [messages]);

  return (
    <div className="mt-6 border rounded p-4 min-h-[300px] bg-gray-100 text-black">
      <h2 className="font-bold mb-4">
        Chat
      </h2>

      {messages.map((msg, index) => (
        <div key={index} className="mb-3">
          <strong>{msg.role}: </strong>
          {msg.content}
        </div>
      ))}

      <div ref={bottomRef} />
    </div>
  );
}