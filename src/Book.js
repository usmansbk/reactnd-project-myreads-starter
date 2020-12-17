import React from "react";
import PropTypes from "prop-types";

export default function Book(props) {
  const { id, title, authors, imageLinks, shelf, handleMove } = props;
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: imageLinks && `url(${imageLinks.thumbnail})`,
          }}
        />
        <div className="book-shelf-changer">
          <select
            value={shelf}
            onChange={(e) =>
              handleMove({ id, title, authors, imageLinks, shelf }, e)
            }
          >
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
  imageLinks: PropTypes.object.isRequired,
  shelf: PropTypes.string.isRequired,
  handleMove: PropTypes.func.isRequired,
};
