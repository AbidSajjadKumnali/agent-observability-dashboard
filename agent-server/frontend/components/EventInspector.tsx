"use client";

interface Props {
  event: any;
}

export default function EventInspector({
  event,
}: Props) {

  console.log("selected event", event);

  return (
    <div className="mt-6 p-4 border rounded bg-gray-100 text-black">
      <h2 className="font-bold text-xl mb-3">
        Event Inspector
      </h2>

      {!event ? (
        <p>Select an event from the timeline</p>
      ) : (
        <div className="space-y-3">

  <div className="flex gap-3">
    <span className="font-bold">
      Type:
    </span>
    <span>{event.type}</span>
  </div>

  <div className="flex gap-3">
    <span className="font-bold">
      Sequence:
    </span>
    <span>{event.seq}</span>
  </div>

  <div>
    <p className="font-bold mb-2">
      Payload
    </p>

    <pre className="bg-white p-3 rounded border overflow-auto text-sm">
      {JSON.stringify(event.payload, null, 2)}
    </pre>
  </div>

</div>
      )}
    </div>
  );
}