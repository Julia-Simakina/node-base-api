// import {  getRepository } from 'typeorm';
// import AppDataSource from '../data-source';
// import Book from '../entity/Book';
// const booksData = [
//     { name: 'Book 1', authorName: 'Author 1', cover: 'cover1.jpg', genre: 'Fantasy' },
//     { name: 'Book 2', authorName: 'Author 2', cover: 'cover2.jpg', genre: 'Mystery' },

// ];

// const seedBooks = async () => {

//     const bookRepository = getRepository(Book);
//     try {
//         for (const bookInfo of booksData) {
//             const book = new Book();
//             book.name = bookInfo.name;
//             book.authorName = bookInfo.authorName;
//             book.cover = bookInfo.cover;
//             book.genre = bookInfo.genre;
//             await bookRepository.save(book);
//         }
//         console.log('Успешно');
//     } catch (error) {
//         console.error('Ошибка  сидирования:', error);
//     } finally {
//         process.exit();
//     }
// };
// seedBooks();
