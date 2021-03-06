import React from "react";
import PropTypes from "prop-types";
import BookGrid from "./BookGrid";

export default function Bookshelf({ title, books, handleMove }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <BookGrid books={books} handleMove={handleMove} />
      </div>
    </div>
  );
}

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array,
  handleMove: PropTypes.func.isRequired,
};
