import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import firebaseConfig from "./firebaseConfig";
import { Button } from "react-bootstrap";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState("");
  const [userType, setUserType] = useState("looking");

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

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
          <Button variant="link" onClick={logout}>
            Sign Out
          </Button>
        )}
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              userType={userType}
              address={address}
              setUserType={setUserType}
              handleAddressChange={handleAddressChange}
            />
          }
        />
        <Route
          path="/signup"
          element={<Signup auth={auth} user={user} setUser={setUser} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
