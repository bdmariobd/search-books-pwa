import React from "react";
import "./Book.css";

function Book(props) {
  console.log(props);
  let requiredToRender = {
    title: props.book.volumeInfo.title,
    url: props.book.volumeInfo.previewLink,
    authors: props.book.volumeInfo.authors,
    thumbnail:
      props.book.volumeInfo.imageLinks !== undefined
        ? props.book.volumeInfo.imageLinks.thumbnail
        : "https://via.placeholder.com/150x236.?text=No+image",
  };
  return (
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
  );
}

export default Book;
