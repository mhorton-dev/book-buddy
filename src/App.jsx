import { AuthProvider } from "./auth/AuthContext.jsx";
import Login from "./auth/Login.jsx";
import Register from "./auth/Register.jsx";
import Account from "./account/Account.jsx";
import Book from "./books/Book.jsx";
import Books from "./books/Books.jsx";
import Error404 from "./layout/Error404.jsx";
import Layout from "./layout/Layout.jsx";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./auth/AuthContext.jsx";

export default function App() {
  const { token } = useAuth();
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="books" element={<Books />} />
            <Route path="books/:id" element={<Book />} />
            <Route path="login" element={<Login />} />
            {!token && <Route path="register" element={<Register />} />}
            {token && <Route path="login" element={<Login />} />}
            <Route path="register" element={<Register />} />
            <Route path="account" elemaent={<Account />} />
            <Route path="*" element={<Error404 />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}
