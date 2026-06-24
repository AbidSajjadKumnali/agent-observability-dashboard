interface Props {
  timeline: any[];
}

export default function SequenceHealth({
  timeline,
}: Props) {
  const seqs = timeline
    .map((e) => e.seq)
    .sort((a, b) => a - b);

  const missing: number[] = [];

  if (seqs.length > 1) {
    for (let i = 0; i < seqs.length - 1; i++) {
      const current = seqs[i];
      const next = seqs[i + 1];

      for (
        let j = current + 1;
        j < next;
        j++
      ) {
        missing.push(j);
      }
    }
  }

  return (
    <div className="mt-4 p-4 border rounded bg-white text-black">
      <h2 className="font-bold mb-2">
        Sequence Health
      </h2>

      {missing.length === 0 ? (
        <div>
          ✅ No missing events
        </div>
      ) : (
        <div>
          ⚠ Missing: {missing.join(", ")}
        </div>
      )}
    </div>
  );
}