import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Subscription from "./pages/Subscription";
import { useEffect, useState } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";

function RequireAuth({ children }: { children: JSX.Element }) {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function checkUser() {
      try {
        const user = await getCurrentUser();
        if (mounted) setAuthed(!!user);
      } catch {
        if (mounted) setAuthed(false);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    checkUser();
    const cancel = Hub.listen("auth", ({ payload }) => {
      if (!mounted) return;
      if (payload.event === "signedIn") {
        setAuthed(true);
        checkUser();
      } else if (payload.event === "signedOut") {
        setAuthed(false);
      }
    });
    return () => {
      mounted = false;
      cancel();
    };
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  return authed ? children : <Navigate to="/signin" replace />;
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/subscription" element={<RequireAuth><Subscription /></RequireAuth>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}