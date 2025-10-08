import { useParams, Link, useNavigate } from "react-router-dom";
import useQuery from "../api/useQuery";
import { useState } from "react";

export default function Book() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: book, loading, error } = useQuery(`/books/${id}`, "book");
  const [reserved, setReserved] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading book: {error}</p>;
  if (!book) return <p>No book found.</p>;

  return (
    <section id="book">
      <h1>{book.title}</h1>
      <figure className="center-children">
        <img
          src={book.coverImage || book.coverimage || ""}
          alt={`Cover of ${book.title}`}
        />
      </figure>
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>{book.description}</p>
      {!book.isReserved && (
        <button
          onClick={() => {
            setReserved(true);
            navigate("/account");
          }}
        >
          {reserved ? "Reserved!" : "Reserve Book"}
        </button>
      )}
      <p>
        <Link to="/books">Back to Books</Link>
      </p>
    </section>
  );
}
