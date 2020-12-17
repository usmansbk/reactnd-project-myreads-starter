import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";

export default function BookGrid({ books = [] }) {
  return (
    <ol className="books-grid">
      {books.map(({ title, authors, imageLinks, id, shelf }) => (
        <li key={id}>
          <Book
            title={title}
            authors={authors}
            imageURL={imageLinks.thumbnail}
            shelf={shelf}
          />
        </li>
      ))}
    </ol>
  );
}

BookGrid.propTypes = {
  books: PropTypes.array,
};
