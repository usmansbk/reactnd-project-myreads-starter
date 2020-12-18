import React from "react";
import { Route } from "react-router-dom";
import debounce from "lodash.debounce";
import * as BooksAPI from "./BooksAPI";
import Shelves from "./Shelves";
import Search from "./Search";
import BookDetails from "./BookDetails";
import { markResultShelf } from "./utils";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    // showSearchPage: false,
    query: "",
    books: [],
    results: [],
    error: null,
  };

  componentDidMount = async () => {
    const books = await BooksAPI.getAll();
    this.setState({ books });
  };

  handleMove = async (book, e) => {
    const { id } = book;
    const newShelf = e.target.value;
    if (newShelf !== "none") {
      try {
        await BooksAPI.update({ id }, newShelf);
        const bookInOldShelf = this.state.books.find((book) => book.id === id);
        let books;
        let results = this.state.results;
        if (bookInOldShelf) {
          const bookInNewShelf = Object.assign({}, bookInOldShelf, {
            shelf: newShelf,
          });
          const filteredBooks = this.state.books.filter(
            (book) => book.id !== id
          );
          books = [...filteredBooks, bookInNewShelf];
        }

        // Now we update the state of the book in the search result
        const oldBookInSearchIndex = results.findIndex(
          (book) => book.id === id
        );

        if (oldBookInSearchIndex !== -1) {
          const newBook = Object.assign({}, book, {
            shelf: newShelf,
          });
          books = [...this.state.books, newBook];

          const oldBookInSearch = results[oldBookInSearchIndex];
          const updatedBookInSearch = Object.assign({}, oldBookInSearch, {
            shelf: newShelf,
          });
          results = results
            .slice(0, oldBookInSearchIndex)
            .concat([updatedBookInSearch])
            .concat(results.slice(oldBookInSearchIndex + 1));
        }
        this.setState({ books, results });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  onChange = (e) => {
    const query = e.target.value;
    this.setState(
      {
        query,
        error: null,
      },
      () => {
        this.debouncedSetState(query);
      }
    );
  };

  debouncedSetState = debounce(async (query) => {
    if (query) {
      const results = await BooksAPI.search(query);
      if (Array.isArray(results)) {
        this.setState({
          results: markResultShelf(results, this.state.books),
          error: null,
        });
      } else {
        this.setState({
          results: [],
          error: "Books not found",
        });
      }
    } else {
      this.setState({
        results: [],
        error: null,
      });
    }
  }, 200);

  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <Search
              query={this.state.query}
              books={this.state.results}
              onChange={this.onChange}
              handleMove={this.handleMove}
              error={this.state.error}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <Shelves books={this.state.books} handleMove={this.handleMove} />
          )}
        />
        <Route path="/book/:id" component={BookDetails} />
      </div>
    );
  }
}

export default BooksApp;
