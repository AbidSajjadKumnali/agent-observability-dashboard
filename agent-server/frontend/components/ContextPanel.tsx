interface ContextPanelProps {
  contexts: {
    context_id: string;
    data: any;
  }[];
}

export default function ContextPanel({
  contexts,
}: ContextPanelProps) {
  return (
    <div className="mt-6 p-4 border rounded bg-gray-200 text-black">
      <h2 className="font-bold text-xl mb-3">
        Context Snapshots
      </h2>

      {contexts.length === 0 ? (
        <p>No context received</p>
      ) : (
        contexts.map((ctx, index) => (
          <div
            key={index}
            className="mb-4 p-3 bg-white rounded border"
          >
            <p>
              <strong>ID:</strong> {ctx.context_id}
            </p>

            <pre className="text-xs overflow-auto mt-2">
              {JSON.stringify(ctx.data, null, 2)}
            </pre>
          </div>
        ))
      )}
    </div>
  );
}