import { useEffect } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "./AuthContext.jsx";

/**
 * A form that allows users to log into an existing account.
 */

export default function Login() {
  const { token, login, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/books");
  }),
    [token, navigate];

  const onLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      await login({ email, password });
      navigate("/books");
    } catch (err) {
      console.error(`Login() error: ${err}`);
    }
  };

  return (
    <>
      <h1>User Login</h1>
      <form onSubmit={onLogin} autoComplete="on">
        <label>
          Email
          <input type="email" name="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button>Login</button>
        {error && <output>{error}</output>}
      </form>
      <Link to="/register">No account? Click register</Link>
    </>
  );
}
