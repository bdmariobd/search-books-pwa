import logo from "./logo.svg";
import "./App.css";
import Books from "./components/Book";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useState, useEffect } from "react";
import SearchBooks from "./components/SearchBooks";

function App() {
  return (
    <div className="App container-fluid p-0">
      <header className="App-header">
        <p>
          <span style={{ color: "#0085f8" }}>G</span>
          <span style={{ color: "#ff4131" }}>o</span>
          <span style={{ color: "#febd00" }}>o</span>
          <span style={{ color: "#0086f8" }}>g</span>
          <span style={{ color: "#00aa4a" }}>l</span>
          <span style={{ color: "#ff4131" }}>e</span>
          <span> </span>
          Search Books
        </p>
      </header>
      <div className="app-body">
        <SearchBooks></SearchBooks>
      </div>
    </div>
  );
}

export default App;
