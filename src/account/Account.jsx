import { Link } from "react-router";
import useQuery from "../api/useQuery";
import Reservations from "./Reservations";
import { useAuth } from "../api/AuthContext";

import "./account.css";

/**
 * account page and reservation
 */

export default function Account() {
  const { token } = useAuth();
  const { data: account, loading, error } = useQuery("username/account");

  if (!token)
    return (
      <p>
        Please <Link to="/login">Login to account</Link>
      </p>
    );

  if (loading) return <p>Loading...</p>;
  if (error || !account) return <p>{`Account() error: ${error}`}</p>;

  return (
    <>
      <header>
        <h1>
          {"Welcome, "}
          {account.firstName && account.lastName
            ? `${account.firstName} ${account.lastName}`
            : account.username}
        </h1>
      </header>

      <section>
        <p>Email: {account.email} </p>
        <h2>Hear are your reservations</h2>
        <Reservations />
      </section>
    </>
  );
}
