import { useEffect, useState } from "react";
import { supabase } from "./clients/supabaseClient";
import Login from "./auth/Login";
import UserProgress from "./pages/UserProgress";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsAuthenticated(!!data.session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });
  }, []);

  return <div>{isAuthenticated ? <UserProgress /> : <Login />}</div>;
}

export default App;
