import { Outlet } from "react-router-dom";

import NavBar from "../components/NavBar.jsx";
import "./layout.css";

export default function Layout() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
