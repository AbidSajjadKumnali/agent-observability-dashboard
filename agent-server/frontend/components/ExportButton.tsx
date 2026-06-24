"use client";

interface Props {
  data: any;
}

export default function ExportButton({
  data,
}: Props) {
  const exportSession = () => {
    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      {
        type: "application/json",
      }
    );

    const url =
      window.URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;
    a.download =
      `session-${Date.now()}.json`;

    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={exportSession}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Export Session
    </button>
  );
}