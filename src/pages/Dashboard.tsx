import { useNavigate } from "react-router-dom";
import { signOut } from "aws-amplify/auth";

export default function Dashboard() {
  const nav = useNavigate();
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p>Welcome! Use the Subscription page to view your status.</p>
      <div className="flex gap-2">
        <button
          className="bg-blue-600 text-white rounded px-4 py-2"
          onClick={() => nav("/subscription")}
        >
          Go to Subscription
        </button>
        <button
          className="bg-gray-200 rounded px-4 py-2"
          onClick={async () => {
            await signOut();
            nav("/signin", { replace: true });
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
