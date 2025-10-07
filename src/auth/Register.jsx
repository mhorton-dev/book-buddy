import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "./AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const onRegister = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    try {
      await register({ email, password, firstName, lastName });
      navigate("books");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <h1>Register new user</h1>
      <form action={onRegister}>
        <label>
          First Name
          <input type="text name = firstName" />
        </label>
        <label>
          Last Name
          <input type="text" name="lastName" />
        </label>
        <label>
          Email Address
          <input type="email" name="email" required />
        </label>
        <label>
          Enter Password
          <input type="password" name="password" required />"
        </label>
        <button> Create User</button>
        {error && <output>{error}</output>}
      </form>
      <Link to="/login">Click here, if you already have an account.</Link>
    </>
  );
}
