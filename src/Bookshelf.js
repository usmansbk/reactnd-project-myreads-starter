import React from "react";
import Book from "./Book";

export default function Bookshelf({ title, books = [] }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(({ title, authors, imageURL, id, status }) => (
            <li key={id}>
              <Book
                title={title}
                authors={authors}
                imageURL={imageURL}
                status={status}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
