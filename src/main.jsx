import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./auth/AuthContext.jsx";
import { ApiProvider } from "./api/ApiContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ApiProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApiProvider>
    </AuthProvider>
  </React.StrictMode>
);
