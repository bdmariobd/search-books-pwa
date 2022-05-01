import logo from "./logo.svg";
import "./App.css";
import Books from "./components/Book";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useState, useEffect } from "react";
import SearchBooks from "./components/SearchBooks";
import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div className="App container-fluid p-0">
      <header className="App-header">
        <Link to="/search-books-pwa">
          <p>
            <span style={{ color: "#0085f8" }}>G</span>
            <span style={{ color: "#ff4131" }}>o</span>
            <span style={{ color: "#febd00" }}>o</span>
            <span style={{ color: "#0086f8" }}>g</span>
            <span style={{ color: "#00aa4a" }}>l</span>
            <span style={{ color: "#ff4131" }}>e</span>
            <span> </span>
            <span style={{ color: "#fff" }}>Search Books </span>
          </p>
        </Link>
        <Link to="/search-books-pwa/favs" id="favs-link">
          <button className="btn btn-primary">Favourites</button>
        </Link>
      </header>
      <div className="app-body">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
