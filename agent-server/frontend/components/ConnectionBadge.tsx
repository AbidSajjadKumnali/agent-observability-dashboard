"use client";

interface Props {
  status: string;
}

export default function ConnectionBadge({ status }: Props) {
  return (
    <div className="rounded-lg border p-2 text-sm">
      Status: {status}
    </div>
  );
}