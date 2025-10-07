import { NavLink } from "react-router-dom";
import { useAuth } from "../api/AuthContext.jsx";

export default function NavBar() {
  const { token, logout } = useAuth();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };
  return (
    <header id="navbar">
      <NavLink id="brand" to="/">
        <img src="/books.png" alt="Book Buddy Logo" />
        <p>Book Buddy</p>
      </NavLink>
      <nav>
        {token ? (
          <>
            <NavLink to="/account">Account</NavLink>
            <button onClick={handleLogout} className="login-btn">
              Log out
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Log in</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
