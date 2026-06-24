import { useAppStore } from "@/store/appStore";
import { useState } from "react";
interface TimelineEvent {
  seq: number;
  type: string;
  payload:any;
}

interface Props {
  timeline: TimelineEvent[];
}

function getEventColor(type: string) {
  switch (type) {
    case "TOKEN":
      return "text-green-600";

    case "CONTEXT_SNAPSHOT":
      return "text-blue-600";

    case "TOOL_CALL":
      return "text-purple-600";

    case "TOOL_RESULT":
      return "text-orange-600";

    case "STREAM_END":
      return "text-gray-600";

    case "PING":
      return "text-yellow-600";

    default:
      return "text-black";
  }
}

export default function TimelinePanel({
  timeline,
}: Props) {
   const { setSelectedEvent } = useAppStore();
   const [search, setSearch] = useState("");
   const [filterType, setFilterType] = useState("ALL");

  return (
    <div className="mt-6 p-4 border rounded bg-gray-200 text-black">
      <h2 className="font-bold text-xl mb-3">
        Event Timeline
      </h2>
      <input
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-2 rounded border text-black"
        
      />
<select
  value={filterType}
  onChange={(e) =>
    setFilterType(e.target.value)
  }
  className="w-full mb-4 p-2 rounded border text-black"
>
  <option value="ALL">All Events</option>
  <option value="TOKEN">TOKEN</option>
  <option value="TOOL_CALL">TOOL_CALL</option>
  <option value="TOOL_RESULT">TOOL_RESULT</option>
  <option value="CONTEXT_SNAPSHOT">
    CONTEXT_SNAPSHOT
  </option>
  <option value="STREAM_END">
    STREAM_END
  </option>
  <option value="PING">PING</option>
</select>

      {timeline.length === 0 ? (
        <p>No events yet</p>
      ) : (
        [...timeline]
  .filter((event) => {
  const matchesSearch =
    event.type
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesFilter =
    filterType === "ALL" ||
    event.type === filterType;

  return (
    matchesSearch &&
    matchesFilter
  );
})
  .sort((a, b) => a.seq - b.seq)
  .map((event, index) => (
  <div
    key={index}
    onClick={() => setSelectedEvent(event)}
    className="border-b py-2 px-2 hover:bg-gray-300 transition-all duration-200 rounded cursor-pointer"
  >
    <span className="font-semibold mr-3">
      #{event.seq}
    </span>

    <span
      className={`px-2 py-1 rounded text-xs font-bold
        ${
          event.type === "TOKEN"
            ? "bg-green-100 text-green-700"
            : event.type === "CONTEXT_SNAPSHOT"
            ? "bg-blue-100 text-blue-700"
            : event.type === "TOOL_CALL"
            ? "bg-purple-100 text-purple-700"
            : event.type === "TOOL_RESULT"
            ? "bg-orange-100 text-orange-700"
            : event.type === "STREAM_END"
            ? "bg-gray-100 text-gray-700"
            : event.type === "PING"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-gray-100 text-black"
        }
      `}
    >
      {event.type}
    </span>
  </div>
))
      )}
    </div>
  );
}