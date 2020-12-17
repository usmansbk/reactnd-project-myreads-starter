import React from "react";
import PropTypes from "prop-types";
import Book from "./Book";

export default function BookGrid({ books, handleMove }) {
  return (
    <ol className="books-grid">
      {books.map(({ title, authors, imageLinks, id, shelf }) => (
        <li key={id}>
          <Book
            title={title}
            authors={authors}
            imageURL={imageLinks.thumbnail}
            shelf={shelf}
            handleMove={handleMove}
          />
        </li>
      ))}
    </ol>
  );
}

BookGrid.propTypes = {
  books: PropTypes.array,
  handleMove: PropTypes.func.isRequired,
};
