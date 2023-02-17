import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";
import SignUp from "./routes/SignUp";
import SignIn from "./routes/SignIn";
import AddPlayer from "./routes/AddPlayer";

initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/add-player" element={<AddPlayer />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
