import React from "react";
import Bookshelf from "./Bookshelf";

export default function Shelves({ shelves = [], openSearch }) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelves.map(({ title, books }, index) => (
            <Bookshelf title={title} books={books} key={index} />
          ))}
        </div>
      </div>
      <div className="open-search">
        <button onClick={openSearch}>Add a book</button>
      </div>
    </div>
  );
}
