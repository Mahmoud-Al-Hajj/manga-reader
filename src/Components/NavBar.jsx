import { Link } from "react-router-dom";
import React from "react";
import "../styles/NavBar.css";

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          Manga Reader
        </Link>
      </div>
      <div className="navbar-menu">
        <ul className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/manga" className="navbar-link">
            Manga
          </Link>

          <Link to="/about" className="navbar-link">
            About
          </Link>
        </ul>
      </div>
    </nav>
  );
}
