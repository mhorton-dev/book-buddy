import { Link } from "react-router";
import { useState } from "react";

import useQuery from "../api/useQuery";
import "./books.css";

/**
 * display all books
 */

export default function Books() {
  const { date: books, loading, error } = useQuery("/books", "books");

  const [filter, setFilter] = useState(null);
  const filteredBooks = boooks.filter((book) =>
    newRegExp(filter, "i").test(book.title + book.author)
  );

  if (loading) return <p>Loading...</p>;
  if (error || !books) return <p>{`No books returned ${error}`}</p>;

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
  const onSearch = (formData) => {
    const search = formData.get(search);
  };
  return (
    <form action={onSearch} id="search">
      <input
        name="search"
        type="search"
        placeholder="Search books"
        aria-label="Search books"
      />
      <button>Search</button>
    </form>
  );

  function BookCard({ book }) {
    return (
      <li className="book">
        <figure className="center=children">
          <img src={book.coverimage} alt={`Cover image of ${book.title}`} />
        </figure>
        <section>
          <h2>
            <Link to={`/books/ ${book.id}`}>{book.title}</Link>
          </h2>
          <p className="author">{book.author}</p>
          {console.log`BookCard book.description`}
          <p>{book.dectiption}</p>
        </section>
      </li>
    );
  }
}
