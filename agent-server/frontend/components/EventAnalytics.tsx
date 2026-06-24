interface Event {
  type: string;
}

interface Props {
  timeline: Event[];
}

export default function EventAnalytics({
  timeline,
}: Props) {

  const counts =
    timeline.reduce(
      (acc: Record<string, number>, event) => {

        acc[event.type] =
          (acc[event.type] || 0) + 1;

        return acc;
      },
      {}
    );

  return (
    <div className="mt-6 p-4 border rounded bg-gray-100 text-black">
      <h2 className="font-bold text-xl mb-4">
        Event Analytics
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {Object.entries(counts).map(
          ([type, count]) => (
            <div
              key={type}
              className="p-3 bg-white rounded border"
            >
              <div className="font-semibold">
                {type}
              </div>

              <div className="text-2xl font-bold">
                {count}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}