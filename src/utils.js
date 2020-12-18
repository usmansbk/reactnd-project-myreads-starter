export function markResultShelf(results = [], mainBooks = []) {
  return results.map((searchedBook) => {
    const found = mainBooks.find((book) => book.id === searchedBook.id);

    if (found) {
      return Object.assign({}, searchedBook, found);
    }
    return searchedBook;
  });
}
