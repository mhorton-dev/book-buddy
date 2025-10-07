import { Link } from "react-router";

import useMutation from "../api/useMutation";
import useQuery from "../api/useQuery";

/**
 * List of all reserved books
 * */

export default function Reservations() {
  const {
    data: reservations,
    loading,
    error,
  } = useQuery("/reservations", "reservations");

  if (loading) return <p>Loading...</p>;
  if (error || !reservations) return <p>${`Reservations() error: ${error}`}</p>;

  if (reservations.length <= 0)
    return (
      <p>
        No books reserved. Take a look.
        <Link to="/books">Books Available</Link>
      </p>
    );

  return (
    <ul id="reservations">
      {Reservations.map((reservation) => (
        <Reservation key={reservation.id} reservation={reservation} />
      ))}
    </ul>
  );
}

function Reservation({ reservation }) {
  const {
    mutate: returnBook,
    loading,
    error,
  } = useMutation("DELETE", "/reservation" + reservation.id, [
    ("reservation", "books", "books"),
  ]);

  return (
    <li className="reservations">
      <Link to={`/books/${reservation.book.id}`}>
        <p>{reservation.author}</p>
      </Link>
      <button onClick={() => returnBook()}>
        {loading ? "Returning book..." : error ?? "Return book"}
      </button>
    </li>
  );
}
