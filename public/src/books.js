function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  //create array that holds all books
  const allBooks = [];
  //create array that has returned: false
  const checkedOutBooks = books.filter((book) => !book.borrows[0].returned);
  //create array that has returned: true
  const availableBooks = books.filter((book) => book.borrows[0].returned);
  //push both of the filtered arrays into the all books array
  allBooks.push(checkedOutBooks, availableBooks);
  return allBooks;
}

function getBorrowersForBook(book, accounts) {
  //get borrows array
  const borrows = book.borrows;
  //loop through the borrows array to find each id and return
  const bookBarrowers = borrows.map((borrower) => {
    //find matching accounts for the transaction
    const matchingAccount = accounts.find(
      (account) => account.id === borrower.id
    );
    //return a new object with the matching account and the returned status
    return { ...matchingAccount, returned: borrower.returned };
  });
  //return the new array of accounts with the included returned status
  return bookBarrowers.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
