import { useState } from "react";
import { signIn, confirmSignIn, fetchAuthSession } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [needsNewPassword, setNeedsNewPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const nav = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      if (!needsNewPassword) {
        console.debug("[SignIn] attempt", { email });
        const result = await signIn({ username: email, password });
        console.debug("[SignIn] result.nextStep", result.nextStep);
        const step = result.nextStep?.signInStep;
        if (step === "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD") {
          setNeedsNewPassword(true);
          setStatus("idle");
          return;
        }
        // Force navigate to dashboard to verify UI path
        nav("/", { replace: true });
        setStatus("idle");
        return;
      } else {
        console.debug("[SignIn] confirm new password");
        await confirmSignIn({ challengeResponse: newPassword });
        nav("/", { replace: true });
        setStatus("idle");
        return;
      }
    } catch (err: any) {
      console.debug("[SignIn] error", err);
      setStatus("error");
      setError(err?.message ?? "Sign-in failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm bg-white shadow rounded p-6 space-y-4"
      >
        <h1 className="text-xl font-semibold">Sign In</h1>
        {!needsNewPassword && (
          <>
            <label className="block">
              <span className="text-sm">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full border rounded px-3 py-2"
              />
            </label>
            <label className="block">
              <span className="text-sm">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full border rounded px-3 py-2"
              />
            </label>
          </>
        )}
        {needsNewPassword && (
          <label className="block">
            <span className="text-sm">New Password</span>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="mt-1 w-full border rounded px-3 py-2"
            />
            <p className="text-xs text-gray-500 mt-1">
              Set a new password to complete first-time sign-in.
            </p>
          </label>
        )}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700 disabled:opacity-50"
        >
          {status === "loading"
            ? needsNewPassword
              ? "Setting password..."
              : "Signing in..."
            : needsNewPassword
            ? "Set New Password"
            : "Sign In"}
        </button>
        {status === "error" && <p className="text-red-600 text-sm">{error}</p>}
      </form>
    </div>
  );
}
