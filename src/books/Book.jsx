import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useAuth } from "../api/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

export default function Book() {
  const { id } = useParams();
  const { data: book, loading, error } = useQuery(`/books/${id}`, "book");
  const { token } = useAuth();
  if (loading) return <p>Loading...</p>;
  if (error || !book) return <p>{`Error loading book ${error}`}</p>;
  return (
    <section id="book">
      <figure className="center-children">
        <img alt={`Cover image of ${book.title} src=${book.coverimage}`} />
      </figure>
      <section>
        <h1>{book.title}</h1>
        <p>{book.author}</p>
        <p>{book.description}</p>
        {token && <ReserveButton book={book} />}
      </section>
    </section>
  );
}

function ReserveButton({ book }) {
  const navigate = useNavigate();
  const {
    mutate: reserve,
    loading,
    error,
  } = useMutation("POST", "/reservations", ["reservations", "books", "book"]);

  const onReserve = async () => {
    const success = await reserve({ bookId: book.id });
    if (success) navigate("/account");
  };

  if (!book.available)
    return <button disabled>{`${book.title} is already reserved`}</button>;

  return (
    <>
      <button onClick={onReserve}>
        {loading ? "Reserving..." : `Reserve ${book.title}`}
      </button>
      {error && <p>{error}</p>}
    </>
  );
}
