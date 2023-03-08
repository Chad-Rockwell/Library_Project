function findAccountById(accounts, id) {
  //loop through the accounts array to find an account that matches the given id and return the account object
  const foundAccount = accounts.find((account, idx) => account.id === id);
  return foundAccount;
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) =>
    accountA["name"].last.toLowerCase() < accountB["name"].last.toLowerCase()
      ? -1
      : 1
  );
}

function getTotalNumberOfBorrows(account, books) {
  //make a borrow counter
  let borrowCount = 0;
  //find account id
  const accountId = account.id;
  //loop through the books array
  for (const book in books) {
    const borrowId = books[book].borrows;
    const borrowIdArray = borrowId.reduce((accumulator, { id }) => {
      accumulator.push(id);
      return accumulator;
    }, []);
    //every time a book borrow id matches account id, counter ++
    if (borrowIdArray.includes(accountId)) {
      borrowCount++;
    }
  }
  //return counter
  return borrowCount;
}

function getBooksPossessedByAccount(account, books, authors) {
  //match authors to books and nest authors into new book object
  const booksWithAuthor = makeBooksWithAuthor(books, authors);
  //check if book is returned
  //for the books that are checked out, match the account id and the borrows id
  return booksWithAuthor.filter((book, idx) => {
    return book.borrows[0].id === account.id && !book.borrows[0].returned;
  });
}

//new book array helper function
function makeBooksWithAuthor(books, authors) {
  const booksWithAuthor = books.map((book) => {
    const author = authors.find((author) => author.id === book.authorId);
    return {
      ...book,
      author,
    };
  });
  return booksWithAuthor;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
