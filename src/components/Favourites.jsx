import React from "react";
import Book from "./Book";
import axios from "axios";
import "./SearchBooks.css";
import { useState, useEffect } from "react";
import { memo } from "react";
import { Store } from "react-notifications-component";

function Favourites(props) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFavs = () => {
    setLoading(true);
    if (
      localStorage.getItem("favs") === null ||
      localStorage.getItem("favs") === "[]"
    ) {
      console.log("No favs");
      setLoading(false);
      Store.addNotification({
        isMobile: true,
        title: "No Favourites",
        message: "You have no favourites",
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
    } else {
      console.log("Favs found");
      let storedFavs = JSON.parse(localStorage.getItem("favs"));
      let reqs = [];
      storedFavs.forEach(function (book) {
        reqs.push(
          axios.get(`https://www.googleapis.com/books/v1/volumes/${book}`)
        );
      });

      axios.all(reqs).then(
        axios.spread(function (...responses) {
          let books = [];
          responses.forEach(function (response) {
            books.push(response.data);
          });
          setBooks(books);
          setLoading(false);
        })
      );
    }
  };

  useEffect(() => {
    getFavs();
  }, []);

  return (
    <div>
      {loading ? (
        <div class="spinner-border" role="status"></div>
      ) : (
        <div className="app-books">
          {books.map((book) => (
            <Book book={book}></Book>
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(Favourites);
