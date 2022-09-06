import React, { useState } from "react";

import { Navigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Signup = ({ auth, user, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (response.user) {
      setUser(response.user);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    const response = await signInWithEmailAndPassword(auth, email, password);
    if (response.user) setUser(response.user);
  };

  return (
    <div>
      {user && <Navigate to="/" />}
      <h1>Signup</h1>
      <input
        type="text"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleCreateUser}>Sign Up</button>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default Signup;
