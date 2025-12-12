export default function Loader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="p-6 flex items-center gap-2 text-gray-600">
      <span className="animate-spin h-4 w-4 rounded-full border-2 border-gray-300 border-t-transparent inline-block" />
      <span>{text}</span>
    </div>
  );
}
