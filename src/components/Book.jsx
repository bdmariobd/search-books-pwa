import React, { useRef } from "react";
import "./Book.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const possbleColors = [
  "#f3b1cd",
  "#b0abca",
  "#bad5f0",
  "#fae4cd",
  "#c1d5a8",
  "#f8efe6",
];

function randomColor() {
  return possbleColors[Math.floor(Math.random() * possbleColors.length)];
}

function Book(props) {
  const author = useRef(null);
  const body = useRef(null);
  console.log(props);
  let requiredToRender = {
    title: props.book.volumeInfo.title,
    url: props.book.volumeInfo.previewLink,
    authors: props.book.volumeInfo.authors,
    thumbnail:
      props.book.volumeInfo.imageLinks !== undefined
        ? props.book.volumeInfo.imageLinks.thumbnail
        : "https://via.placeholder.com/150x236.?text=No+image",
    description:
      props.book.volumeInfo.description !== undefined
        ? props.book.volumeInfo.description
        : "No description available",
    randomColor: randomColor(),
  };
  return (
    <div
      class="book mobile-layout"
      style={{
        backgroundColor: requiredToRender.randomColor,
      }}
    >
      <div
        class="book-cover"
        onMouseOver={(e) => {
          author.current.style.visibility = "visible";
          body.current.style.visibility = "visible";
        }}
        onMouseOut={(e) => {
          author.current.style.visibility = "hidden";
          body.current.style.visibility = "hidden";
        }}
      >
        <img class="book-top" src={requiredToRender.thumbnail} alt="book-top" />
        <img
          class="book-side"
          src="https://raw.githubusercontent.com/atomic-variable/images-repo/e37f432405904a280858e5437ce1960753bc78a3/book-side.svg"
          alt="book-side"
        />
      </div>
      <div class="preface">
        <div class="content">
          <div class="header">
            <a class="title" href={requiredToRender.url}>
              {requiredToRender.title.length > 20
                ? requiredToRender.title.substring(0, 20) + "..."
                : requiredToRender.title}
            </a>
            <div class="icon">
              <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
            </div>
          </div>
          <div class="author" ref={author}>
            by {requiredToRender.authors}
          </div>
          <div class="body" ref={body}>
            <p>
              {requiredToRender.description.length > 200
                ? requiredToRender.description.substring(0, 200) + "..."
                : requiredToRender.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  /* return (
    <div className="book">
      <div className="book-top">
        <img
          className="book-cover"
          src={requiredToRender.thumbnail}
          alt={requiredToRender.title}
        />
        <div className="book-shelf-changer">
          <select>
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <a className="book-title" href={requiredToRender.url}>
        {requiredToRender.title}
      </a>
      <div className="book-authors">{requiredToRender.authors}</div>
    </div>
  ); */
}

export default Book;
