import { useEffect, useState } from "react";

type SubscriptionInfo = {
  status: "active" | "trialing" | "past_due" | "canceled" | "none";
  planName?: string;
  renewalDate?: string;
};

export default function Subscription() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<SubscriptionInfo | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);

        // Temporarily stubbed until sandbox HTTP endpoints are confirmed:
        // - Functions 404/Failed to fetch via /functions/* and /amplify/functions/* on your setup.
        // - Once CLI exposes the local server/port, we will re-enable fetch calls.
        const data: SubscriptionInfo = {
          status: "none",
        };
        if (mounted) setInfo(data);
      } catch (e: any) {
        if (mounted) setError(e?.message ?? "Failed to load subscription");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const onManageBilling = async () => {
    try {
      // Temporarily disabled until backend function endpoints are reachable.
      alert("Manage Billing is temporarily disabled until backend endpoints are reachable.");
    } catch (e: any) {
      setError(e?.message ?? "Failed to open billing portal");
    }
  };

  if (loading) return <div className="p-6">Loading subscription...</div>;
  if (error)
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded">
        {error}
      </div>
    );

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Subscription</h1>
      <p className="text-sm text-gray-500">
        Backend calls are temporarily disabled while we align Amplify Sandbox function endpoints.
      </p>
      <div className="space-y-1">
        <p>
          <span className="font-medium">Status:</span> {info?.status ?? "none"}
        </p>
        {info?.planName && (
          <p>
            <span className="font-medium">Plan:</span> {info.planName}
          </p>
        )}
        {info?.renewalDate && (
          <p>
            <span className="font-medium">Renews:</span>{" "}
            {new Date(info.renewalDate).toLocaleString()}
          </p>
        )}
      </div>
      <button className="bg-blue-600 text-white rounded px-4 py-2" onClick={onManageBilling}>
        Manage Billing
      </button>
    </div>
  );
}
