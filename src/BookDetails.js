import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

export default class BookDetails extends React.Component {
  state = {
    book: null,
  };

  componentDidMount = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    try {
      const book = await BooksAPI.get(id);
      this.setState({ book });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { book } = this.state;
    const {
      title,
      printType,
      imageLinks,
      description,
      publishedDate,
      authors,
      pageCount,
      infoLink,
      previewLink,
      industryIdentifiers = [],
    } = book || {};

    return (
      <>
        <Link to="/">
          <button className="close-search">Close</button>
        </Link>
        {this.state.book ? (
          <div className="container">
            <div>
              <h2>{title}</h2>
              <small>{printType}</small>
              <div>
                <a href={previewLink}>
                  <img
                    alt={"Preview " + (title || "")}
                    src={imageLinks && imageLinks.thumbnail}
                  />
                </a>
              </div>
            </div>

            <p>{description}</p>
            <a href={infoLink}>More</a>

            <div className="info">
              <div className="row">
                <h5>Originally published:</h5>
                <small>{publishedDate}</small>
              </div>
              <div className="row">
                <h5>Authors:</h5>
                <p className="book-authors">{authors}</p>
              </div>
            </div>
            <div className="row">
              <h5>ISBN:</h5>
              <p>
                {industryIdentifiers.map((isbn, index) => (
                  <small key={index}>{isbn.identifier + " "}</small>
                ))}
              </p>
            </div>
            <div className="row">
              <h5>Page count:</h5>
              <small>{pageCount}</small>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </>
    );
  }
}
