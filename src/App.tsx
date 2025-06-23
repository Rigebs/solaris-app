import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./clients/supabaseClient";
import type { Session } from "@supabase/supabase-js";

import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import AuthCallback from "./auth/AuthCallback";
import CompleteProfile from "./auth/CompleteProfile";

import UserProgress from "./pages/UserProgress";
import Dashboard from "./admin/Dashboard";
import UsarVale from "./pages/UseVoucher";
import RegisterSale from "./pages/RegisterSale";
import ListOrders from "./pages/ListOrders";
import Loader from "./components/Loader";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) return <Loader />;

  const isAdmin = session?.user.email === ADMIN_EMAIL;

  return (
    <Routes>
      <Route
        path="/"
        element={
          session ? (
            isAdmin ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/user-progress" />
            )
          ) : (
            <Navigate to="/auth/login" />
          )
        }
      />

      <Route
        path="/auth/login"
        element={!session ? <Login /> : <Navigate to="/" />}
      />

      <Route
        path="/auth/signup"
        element={!session ? <SignUp /> : <Navigate to="/" />}
      />

      <Route path="/auth/callback" element={<AuthCallback />} />

      <Route
        path="/auth/complete-profile"
        element={session ? <CompleteProfile /> : <Navigate to="/auth/login" />}
      />

      <Route
        path="/user-progress"
        element={
          session ? (
            isAdmin ? (
              <Navigate to="/dashboard" />
            ) : (
              <UserProgress />
            )
          ) : (
            <Navigate to="/auth/login" />
          )
        }
      />
      <Route
        path="/usar-vale"
        element={session ? <UsarVale /> : <Navigate to="/auth/login" />}
      />
      <Route
        path="/ventas"
        element={session ? <RegisterSale /> : <Navigate to="/auth/login" />}
      />
      <Route
        path="/pedidos"
        element={session ? <ListOrders /> : <Navigate to="/auth/login" />}
      />
      <Route
        path="/dashboard"
        element={isAdmin ? <Dashboard /> : <Navigate to="/auth/login" />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
