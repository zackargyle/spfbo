'use client';
import data from './db.json';

export type Book = {
    batch: number,
    title: string,
    author: string,
    cover: string,
    amazon: string,
    audiobook: boolean,
    blog: string,
    isFinalist: boolean,
    isSemiFinalist: boolean,
    isCut: boolean,
    isCoverFinalist: boolean,
    isKU: boolean,
};

type BookList = Array<Book>;

export type Store = {
  [batch: string]: {
      blogs: Array<string>,
      books: BookList,
      finalistCount: number,
  }
};

function createStore(books: BookList): Store {
    const store: Store = {};

    books.forEach((book: Book) => {
      const batchKey = 'spfbo-' + book.batch;
      store[batchKey] = store[batchKey] || { blogs: [], books: [], finalistCount: 0 };
      let batch = store[batchKey];

      batch.books.push(book);

      if (book.isFinalist) {
        batch.finalistCount++;
      }

      if (!batch.blogs.includes(book.blog)) {
        batch.blogs.push(book.blog);
      }
    });

    // sort books and blogs for consistency
    Object.keys(store).forEach(batch => {
      store[batch].blogs.sort();
      store[batch].books.sort((a, b) => {
        if (a.isFinalist) return -1;
        if (b.isFinalist) return 1;
        if (a.isSemiFinalist) return -1;
        if (b.isSemiFinalist) return 1;
        if (a.isCoverFinalist) return -1;
        if (b.isCoverFinalist) return 1;
        if (a.isCut) return 1;
        if (b.isCut) return -1;
        return 0;
      });
    });

    return store;
  }


export default () => createStore(data);
