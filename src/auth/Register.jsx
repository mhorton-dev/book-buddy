import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

export default function Register() {
  const { token, register, loading, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/login");
  }, [token, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      await register({ firstName, lastName, email, password });
      navigate("/books");
    } catch (err) {
      console.error(`Register error: ${err}`);
    }
  }

  return (
    <>
      <h1>Register new user</h1>
      <form onSubmit={handleSubmit} autoComplete="on">
        <label>
          First Name <input type="text" name="firstName" required />{" "}
        </label>
        <label>
          Last Name <input type="text" name="lastName" required />{" "}
        </label>
        <label>
          Email Address <input type="email" name="email" required />{" "}
        </label>
        <label>
          Enter Password <input type="password" name="password" required />{" "}
        </label>
        <button disabled={loading}>
          {loading ? "Registering..." : "Create User"}{" "}
        </button>
        {error && <output style={{ color: "red" }}>{error}</output>}{" "}
      </form>
      <Link to="/login">Click here, if you already have an account.</Link>
    </>
  );
}
