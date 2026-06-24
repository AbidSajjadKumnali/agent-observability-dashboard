"use client";

type ToolEvent = {
  tool_name: string;
  status: string;
};

export default function ToolPanel({
  tools,
}: {
  tools: ToolEvent[];
}) {
  return (
    <div className="mt-6 border rounded p-4 bg-gray-100 text-black">
      <h2 className="font-bold mb-4">
        Tool Activity
      </h2>

      {tools.length === 0 ? (
        <p>No tools executed yet.</p>
      ) : (
        tools.map((tool, index) => (
          <div key={index}>
            🔧 {tool.tool_name} — {tool.status}
          </div>
        ))
      )}
    </div>
  );
}