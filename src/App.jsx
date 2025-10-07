import Account from "./account/Account.jsx";
import Login from "./auth/Login.jsx";
import Register from "./auth/Register.jsx";
import Book from "./books/Book.jsx";
import Books from "./books/Books.jsx";
import Error404 from "./layout/Error404.jsx";
import Layout from "./layout/Layout.jsx";
import { Route, Routes } from "react-router";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="books" element={<Books />} />
          <Route path="books:id" element={<Book />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="account" element={<Account />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </>
  );
}
