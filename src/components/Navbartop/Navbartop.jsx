import React from "react";
import { Link } from "react-router-dom";
import "./Navbartop.css";

const Navbartop = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="navbartop-container">
      <Link to="/" className="navbartop-home">Home</Link>
      <div className="navbartop-search-wrapper">
        <input
          type="text"
          placeholder="Search products"
          className="navbartop-search-input"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Link to="/cart" className="navbartop-cart">Cart</Link>
    </div>
  );
};

export default Navbartop;
