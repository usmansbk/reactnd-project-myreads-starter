import React from "react";
import * as BooksAPI from "./BooksAPI";
import Shelves from "./Shelves";
import Search from "./Search";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
  };

  openSearch = () => this.setState({ showSearchPage: true });

  closeSearch = () => this.setState({ showSearchPage: false });

  componentDidMount = async () => {
    const books = await BooksAPI.getAll();
    this.setState({ books });
  };

  handleMove = async (id, e) => {
    const newShelf = e.target.value;
    if (newShelf !== "none") {
      try {
        await BooksAPI.update({ id }, newShelf);
        const bookInOldShelf = this.state.books.find((book) => book.id === id);
        if (bookInOldShelf) {
          const bookInNewShelf = Object.assign({}, bookInOldShelf, {
            shelf: newShelf,
          });
          const filteredBooks = this.state.books.filter(
            (book) => book.id !== id
          );
          const books = [...filteredBooks, bookInNewShelf];
          this.setState({ books });
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search
            books={this.state.books}
            closeSearch={this.closeSearch}
            handleMove={this.handleMove}
          />
        ) : (
          <Shelves
            books={this.state.books}
            openSearch={this.openSearch}
            handleMove={this.handleMove}
          />
        )}
      </div>
    );
  }
}

export default BooksApp;
