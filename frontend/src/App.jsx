import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";

function App() {
  const token = localStorage.getItem("token");

  const [showSignup, setShowSignup] = useState(false);

  if (token) {
    return <Dashboard />;
  }

  return showSignup ? (
    <SignupPage onSignupSuccess={() => setShowSignup(false)} />
  ) : (
    <LoginPage onSignup={() => setShowSignup(true)} />
  );
}

export default App;