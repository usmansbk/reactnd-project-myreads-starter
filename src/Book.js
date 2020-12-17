import React from "react";
import PropTypes from "prop-types";

export default function Book({ title, authors, imageURL, shelf, handleMove }) {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${imageURL})`,
          }}
        />
        <div className="book-shelf-changer">
          <select value={shelf} onChange={handleMove}>
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
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors}</div>
    </div>
  );
}

Book.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  imageURL: PropTypes.string.isRequired,
  shelf: PropTypes.string.isRequired,
  handleMove: PropTypes.func.isRequired,
};
