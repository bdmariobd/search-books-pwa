import React from "react";
import Book from "./Book";
import axios from "axios";
import "./SearchBooks.css";
import { useState } from "react";

function Favourites() {
  const [books, setBooks] = useState([]);
  if (
    localStorage.getItem("favs") === null ||
    localStorage.getItem("favs") === "[]"
  ) {
  }

  let storedFavs = JSON.parse(localStorage.getItem("favs"));
  let reqs = [];

  storedFavs.forEach(function (book) {
    reqs.push(axios.get(`https://www.googleapis.com/books/v1/volumes/${book}`));
  });

  Promise.all(reqs)
    .then(function (values) {
      setBooks(values.map((res) => res.data));
    })
    .then(function () {
      console.log(books);
    });

  return (
    <div className="app-books">
      {books.map((book) => (
        <Book book={book}></Book>
      ))}
    </div>
  );
}

export default Favourites;
