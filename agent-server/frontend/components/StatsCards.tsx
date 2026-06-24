interface Props {
  messages: number;
  tools: number;
  contexts: number;
  events: number;
}

export default function StatsCards({
  messages,
  tools,
  contexts,
  events,
}: Props) {
  const cards = [
    { label: "Messages", value: messages },
    { label: "Tools", value: tools },
    { label: "Contexts", value: contexts },
    { label: "Events", value: events },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 my-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-gray-100 text-black rounded p-4"
        >
          <div className="text-sm">
            {card.label}
          </div>

          <div className="text-3xl font-bold">
            {card.value}
          </div>
        </div>
      ))}
    </div>
  );
}