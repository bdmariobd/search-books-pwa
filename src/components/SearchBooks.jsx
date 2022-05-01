import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Book from "./Book";
import "./SearchBooks.css";
import "../App.css";
import { Store } from "react-notifications-component";

const maxResults = 10;
const SearchBooks = (props) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookField, setBookField] = useState("");
  const [authorField, setAuthorField] = useState("");
  const [optionField, setOptionField] = useState("all");

  useEffect(() => {
    if (!error) return;
    Store.addNotification({
      isMobile: true,
      title: "Error",
      message: error.message,
      type: "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
  }, [error]);

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
            className="app-selection-field"
            type={"radio"}
            name={"selection"}
            value={"books"}
            onChange={(e) => setOptionField(e.target.value)}
            defaultChecked={false}
          />
          <label className="app-selection-field-label" htmlFor={"books"}>
            Books
          </label>
          <input
            className="app-selection-field"
            type={"radio"}
            name={"selection"}
            value={"magazines"}
            onChange={(e) => setOptionField(e.target.value)}
            defaultChecked={false}
          />
          <label className="app-selection-field-label" htmlFor={"magazines"}>
            Magazines
          </label>
          <input
            className="app-selection-field"
            type={"radio"}
            name={"selection"}
            value={"all"}
            onChange={(e) => setOptionField(e.target.value)}
            defaultChecked={true}
          />
          <label className="app-selection-field-label" htmlFor={"all"}>
            All
          </label>
        </div>
      </form>
      {loading ? (
        <div className="centered spinner-border" role="status"></div>
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
