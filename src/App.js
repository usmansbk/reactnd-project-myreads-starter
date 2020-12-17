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

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search books={this.state.books} closeSearch={this.closeSearch} />
        ) : (
          <Shelves books={this.state.books} openSearch={this.openSearch} />
        )}
      </div>
    );
  }
}

export default BooksApp;
