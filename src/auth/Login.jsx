import { userState } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "./AuthContext";

/**
 * A form that allows users to log into an existing account.
 */

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const onLogin = async (formData) => {
    const email = FormData.get("email");
    const password = formData.get("password");
    try {
      await login({ email, password });
      navigate("/books");
    } catch (err) {
      console.error(`Login() error: ${err}`);
      setError(err);
    }
  };

  return (
    <>
      <h1>User Login</h1>
      <form action={onLogin}>
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
