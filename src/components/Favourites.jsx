import React from "react";
import Book from "./Book";
import axios from "axios";
import "./SearchBooks.css";
import { useState } from "react";
import { memo } from "react";

function Favourites() {
  const [books, setBooks] = useState([]);
  if (
    localStorage.getItem("favs") === null ||
    localStorage.getItem("favs") === "[]"
  ) {
    return (
      <div class="alert error">
        <input type="checkbox" id="alert1" />
        <label class="close" title="close" for="alert1">
          <i class="icon-remove"></i>
        </label>
        <p class="inner">
          <strong>Warning!</strong> No favourites added
        </p>
      </div>
    );
  }

  let storedFavs = JSON.parse(localStorage.getItem("favs"));
  let reqs = [];

  storedFavs.forEach(function (book) {
    reqs.push(axios.get(`https://www.googleapis.com/books/v1/volumes/${book}`));
  });

  Promise.all(reqs).then(function (values) {
    setBooks(
      values.map(function (value) {
        return value.data;
      })
    );
  });

  return (
    <div className="app-books">
      {books.map((book) => (
        <Book book={book}></Book>
      ))}
    </div>
  );
}

export default memo(Favourites);
