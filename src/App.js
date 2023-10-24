import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/navbar.js";

import Home from "./routes/home.js";
import SignUp from "./routes/signup.js";
import LogIn from "./routes/login.js";
import WBlock from "./routes/wblock.js";

import "./styles/App.css";

export default function App() {
    const [username, setUsername] = useState("");

  return (
      <div className="main">
      <BrowserRouter>

      <NavBar
      username={username}
      setUsername={setUsername}
      />

      <Routes>
        <Route exact path="/" element={
            <Home />}>
        </Route>
        <Route exact path="/login" element={
            <LogIn 
            setUsername = {setUsername}
            />}>
        </Route>
        <Route exact path="/signup" element={
            <SignUp
            setUsername = {setUsername}
            />}>
        </Route>
        <Route exact path="/wblock" element={
            <WBlock 
           username = {username}
           />}>
        </Route>
      </Routes>

      </BrowserRouter>
      </div>
  );
}
