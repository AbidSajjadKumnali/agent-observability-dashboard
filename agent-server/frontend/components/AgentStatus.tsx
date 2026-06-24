interface Props {
  state: string;
   tool: string;
  stream: string;
  lastEvent: string;
  eventCount: number;
}

export default function AgentStatus({
  state,
  tool,
  stream,
  lastEvent,
  eventCount,
  
}: Props) {

  const color =
    state === "Streaming"
      ? "bg-green-500"
      : state === "Tool Running"
      ? "bg-yellow-500"
      : state === "Loading Context"
      ? "bg-blue-500"
      : "bg-gray-500";

 return (
  <div className="mt-4 p-4 border rounded bg-gray-100 text-black">
    <h2 className="font-bold mb-2">
      Agent State
    </h2>

    <div className="flex items-center gap-3 mb-3">
      <div
        className={`w-4 h-4 rounded-full ${color}`}
      />

      <span className="font-semibold">
        {state}
      </span>
    </div>

    <p>
      <strong>Current Tool:</strong>{" "}
      {tool || "None"}
    </p>

    <p>
      <strong>Current Stream:</strong>{" "}
      {stream || "None"}
    </p>

    <p>
      <strong>Last Event:</strong>{" "}
      {lastEvent || "None"}
    </p>
    <p>
  <strong>Total Events:</strong> {eventCount}
</p>
  </div>
);
}