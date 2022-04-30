import React from "react";
import { useState } from "react";
import axios from "axios";
import Book from "./Book";

const maxResults = 10;
const SearchBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookField, setBookField] = useState("");
  const [authorField, setAuthorField] = useState("");
  const [optionField, setOptionField] = useState("all");

  const onSearch = (event) => {
    event.preventDefault();
    if (bookField === "" && authorField === "") {
      setError(new Error("Please enter a book or an author"));
      return;
    }

    const query = `https://www.googleapis.com/books/v1/volumes?q=${bookField}+inauthor:${authorField}&maxResults=${maxResults}&printType=${optionField}`;
    setLoading(true);
    setError(null);
    axios
      .get(query)
      .then((res) => {
        console.log(res.data.items);
        if (res.data.totalItems === 0) {
          throw new Error("No results found");
        }
        setBooks(res.data.items);
        setLoading(false);
        console.log(books);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  const onChangeBook = (e) => {
    setBookField(e.target.value);
  };

  const onChangeAuthor = (e) => {
    setAuthorField(e.target.value);
  };

  return (
    <div>
      <form className="search-books" onSubmit={onSearch}>
        <div className="app-searching">
          <input
            onChange={onChangeBook}
            id="search-books"
            className="app-search-field"
            type="text"
            placeholder="Book title..."
          />
          <input
            onChange={onChangeAuthor}
            id="search-authors"
            className="app-search-field"
            type="text"
            placeholder="Book authors..."
          />
          <input
            id="search-button"
            className="app-search-button"
            type="submit"
            value="Search"
          />
        </div>
        <div className="app-selection">
          <input
            type={"radio"}
            name={"selection"}
            value={"books"}
            onChange={(e) => setOptionField(e.target.value)}
            defaultChecked={false}
          />
          <label htmlFor={"books"}>Books</label>
          <input
            type={"radio"}
            name={"selection"}
            value={"magazines"}
            onChange={(e) => setOptionField(e.target.value)}
            defaultChecked={false}
          />
          <label htmlFor={"magazines"}>Magazines</label>
          <input
            type={"radio"}
            name={"selection"}
            value={"all"}
            onChange={(e) => setOptionField(e.target.value)}
            defaultChecked={true}
          />
          <label htmlFor={"all"}>All</label>
        </div>
      </form>
      {loading ? (
        <div class="spinner-border" role="status"></div>
      ) : error ? (
        <div className="app-error">{error.message}</div>
      ) : (
        <div className="app-books">
          {books.map((book) => (
            <Book book={book}></Book>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBooks;
