import { Link } from "react-router-dom";
import { useState } from "react";
import useQuery from "../api/useQuery";
import "./books.css";

export default function Books() {
  const { data, loading, error } = useQuery("/books", "books");
  const [filter, setFilter] = useState("");
  const books = Array.isArray(data) ? data : [];

  const allBooks = Array.isArray(books) ? books : [books];
  const filteredBooks = allBooks.filter((book) =>
    new RegExp(filter, "i").test(book.title + book.author)
  );

  if (loading) return <p>Loading...</p>;
  if (error || !books) return <p>{`No books returned ${error || ""}`}</p>;
  if (!books.length) return <p>No books Found.</p>;

  return (
    <>
      <h1>Catalog</h1>
      <SearchForm setFilter={setFilter} />
      <ul id="books">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </ul>
    </>
  );
}

function SearchForm({ setFilter }) {
  function onSearch(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    setFilter(formData.get("search"));
  }

  return (
    <form onSubmit={onSearch} id="search" autoComplete="on">
      <input
        name="search"
        type="search"
        placeholder="Search books"
        aria-label="Search books"
      />
      <button>Search</button>
    </form>
  );
}

function BookCard({ book }) {
  console.log("BookCard", book.description);
  return (
    <li className="book">
      <figure className="center-children">
        <img
          src={book.coverimage}
          alt={`Cover image of ${JSON.stringify(book.title)}`}
        />
        {console.log(`img src of ${book.title}: ${book.coverImage}`)}
      </figure>
      <section>
        <h2>
          <Link to={`/books/${book.id}`}>{book.title}</Link>
        </h2>
        <p className="author">{book.author}</p>
        <p>{book.description}</p>
      </section>
    </li>
  );
}
