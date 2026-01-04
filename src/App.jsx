import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import "./App.css";

function App() {
  return (
    <div className="app-root">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
