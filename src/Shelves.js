import React from "react";
import PropTypes from "prop-types";
import Bookshelf from "./Bookshelf";

/**
 *
 * @description Creates a list of book shelves
 * @param {object[]} books  - list of books
 * @returns {object[]} - The categories of books
 */
function getSections(books) {
  const sections = books.reduce((accumulator, book) => {
    const shelfName = book.shelf;
    const section = accumulator[shelfName];
    if (section) {
      section.books.push(book);
    } else {
      let title;
      switch (book.shelf) {
        case "currentlyReading":
          title = "Currently Reading";
          break;
        case "read":
          title = "Read";
          break;
        case "wantToRead":
          title = "Want to Read";
          break;
        default:
          title = "Currently Reading";
          break;
      }
      accumulator[shelfName] = {
        books: [book],
        title,
      };
    }
    return accumulator;
  }, {});

  return Object.values(sections);
}

export default function Shelves({ books, openSearch, handleMove }) {
  const shelves = getSections(books);

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelves.map(({ title, books, shelf }) => (
            <Bookshelf
              title={title}
              books={books}
              key={title}
              shelf={shelf}
              handleMove={handleMove}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <button onClick={openSearch}>Add a book</button>
      </div>
    </div>
  );
}

Shelves.propTypes = {
  books: PropTypes.array.isRequired,
  handleMove: PropTypes.func.isRequired,
};
