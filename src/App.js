import { useState, useEffect } from "react";

import "./App.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";

import Map from "./components/Map";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { firebaseConfig } from "./keys";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  const [user, setUser] = useState(null);

  const logout = (e) => {
    e.preventDefault();
    setUser(null);
  };

  return (
    <BrowserRouter>
      <nav style={{ position: "absolute", width: "100%" }}>
        <Link to="/">Home</Link>
        {!user && <Link to="/signup">Login</Link>}
        {user && (
          <a href="#" onClick={logout}>
            Sign Out
          </a>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={<Signup auth={auth} user={user} setUser={setUser} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
