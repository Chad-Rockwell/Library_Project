const { makeBooksWithAuthor } = require("./accounts");

function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  const checkedOutBooks = books.filter((book) => !book.borrows[0].returned);
  return checkedOutBooks.length;
}

function getMostCommonGenres(books) {
  //get genre counts
  const genreCount = books.reduce((accumulator, book) => {
    if (!accumulator[book.genre]) {
      accumulator[book.genre] = 1;
    } else if (accumulator[book.genre]) {
      accumulator[book.genre]++;
    }
    return accumulator;
  }, {});
  //convert the genres object to make it usable with .map, then make a popularGenres array
  const popularGenres = Object.entries(genreCount).map(([genre, count]) => ({
    name: genre,
    count,
  }));
  //sort the new array from most popular to least popular
  popularGenres.sort((genreA, genreB) => genreB.count - genreA.count);
  //return and slice the ordered array
  return popularGenres.slice(0, 5);
}

function getMostPopularBooks(books) {
  const popularBooks = books.map((book) => {
    return { name: book.title, count: book.borrows.length };
  }, {});
  popularBooks.sort((bookA, bookB) => bookB.count - bookA.count);
  return popularBooks.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  //make a new array for matching
  const booksByAuthorArray = getAuthorAndCountArray(books, authors);
  //sort the array from most popular to least popular
  booksByAuthorArray.sort((authorA, authorB) => authorB.count - authorA.count);
  //return the sliced array
  return booksByAuthorArray.slice(0, 5);

}

//helper function for getMostPopularAuthors
function getAuthorAndCountArray(books, authors) {
    //make a new array for matching
    const booksByAuthorArray = [];
    //match books and authors
    books.forEach((book) => {
      //in the books loop loop through authors
      authors.forEach((author) => {
        //match the book ID to the author ID
        if (book.authorId === author.id) {
          const authorName = `${author.name.first} ${author.name.last}`;
          //loop through the new array to see if we already found that author
          const authorObjInNewArray = booksByAuthorArray.find((authorObj) => {
            authorObj.name === authorName;
          });
          //if the author doesn't exist in the new array, push it to the array as a new object with the name and count
          if (!authorObjInNewArray) {
            booksByAuthorArray.push({
              name: authorName,
              count: book.borrows.length,
            });
          }
          //if the author does exist, add the new book borrows length to the authors count
          else {
            authorObjInNewArray.count += book.borrows.length;
          }
        }
      });
    });
    //return the new array
    return booksByAuthorArray;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
