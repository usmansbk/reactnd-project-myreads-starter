import React from "react";
import Book from "./Book";

export default function BookGrid({ books = [] }) {
  return (
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
  );
}
