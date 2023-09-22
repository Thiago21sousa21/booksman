import { Book, CreateBook } from "../protocols/book";
import { CreateReview } from "../protocols/review";
import prisma from "../database";

export async function getBooks() {
  const books = await prisma.books.findMany()
  return books
}

export async function getBook(id: number) {
  const book = await prisma.books.findUnique({
    where: {id}
  })
  return book
}

export async function createBook(book: CreateBook) {
   const { title, author, publisher, purchaseDate } = book;
  // const query = `
  //   INSERT INTO books (title, author, publisher, "purchaseDate")
  //   VALUES ($1, $2, $3, $4)`;

  // const result = await prisma.query(query, [
  //   title, author, publisher, purchaseDate
  // ]);

  // return result.rowCount;
  const result = await prisma.books.create({
    data:{
      title, author, publisher, purchaseDate
    }
  })
  return result

}

export async function reviewBook(bookReview: CreateReview) {
  const { bookId, grade, review } = bookReview;
  // const query = `
  //   UPDATE books 
  //   SET
  //     grade = $1,
  //     review = $2,
  //     read = true 
  //   WHERE id = $3
  // `;

  // const result = await prisma.query(query, [grade, review, bookId]);
  // return result.rowCount;

  const rev = await prisma.books.update({
    data:{review, grade, read:true},
    where:{id:bookId}
  })
  return rev
}