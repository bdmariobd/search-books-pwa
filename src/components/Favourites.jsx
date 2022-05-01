import React from "react";
import Book from "./Book";
import axios from "axios";
import "./SearchBooks.css";
import "../App.css";
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
      let savedBook = [];
      storedFavs.forEach((id) => {
        if (localStorage.getItem("book-" + id)) {
          savedBook.push(JSON.parse(localStorage.getItem("book-" + id)));
          storedFavs = storedFavs.filter((favId) => favId !== id);
        }
      });

      console.log(savedBook);

      if (storedFavs.length === 0) {
        setLoading(false);
        setBooks(savedBook);
        return;
      }

      if (storedFavs.length > 0 && !navigator.onLine) {
        setLoading(false);
        setBooks(savedBook);
        Store.addNotification({
          isMobile: true,
          title: "No Internet",
          message: "Could not load all your favourites",
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
        return;
      }

      let reqs = [];
      storedFavs.forEach(function (book) {
        reqs.push(
          axios.get(`https://www.googleapis.com/books/v1/volumes/${book}`)
        );
      });

      axios.all(reqs).then(
        axios.spread(function (...responses) {
          responses.forEach(function (response) {
            savedBook.push(response.data);
          });
          setBooks(savedBook);
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
        <div class="centered spinner-border" role="status"></div>
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
