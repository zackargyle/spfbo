'use client';
import { title } from 'process';
import bookDB from './db.json';
import finalistsDB from './finalists.json';

export type TFinalistsDB = {
  [batch: string]: {
    [title: string]: number,
  }
}

export type TBook = {
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

export type TBookList = Array<TBook>;

export type TStore = {
  [batch: string]: {
      blogs: Array<string>,
      books: BookList,
      finalists: BookList,
  },
};

let cachedStore: TStore | null = null;

function createStore(books: BookList): TStore {
  if (cachedStore !== null) {
    return cachedStore;
  }
  const store: TStore = {};

  books.forEach((book: TBook) => {
    const batchKey = 'spfbo-' + book.batch;
    store[batchKey] = store[batchKey] || { blogs: [], books: [], finalists: [] };
    let batch = store[batchKey];

    batch.books.push(book);

    if (book.isFinalist) {
      batch.finalists.push(book);
    }

    if (!batch.blogs.includes(book.blog)) {
      batch.blogs.push(book.blog);
    }
  });

  // sort books and blogs for consistency
  Object.keys(store).forEach(batch => {
    store[batch].blogs.sort();

    // Sort for default view
    store[batch].books.sort((book1, book2) => {
      if (book1.isFinalist) return -1;
      if (book2.isFinalist) return 1;
      if (book1.isSemiFinalist) return -1;
      if (book2.isSemiFinalist) return 1;
      if (book1.isCoverFinalist) return -1;
      if (book2.isCoverFinalist) return 1;
      if (book1.isCut) return 1;
      if (book2.isCut) return -1;
      return 0;
    });

    store[batch].finalists.sort((book1, book2) => {
      const book2Rank = (finalistsDB as TFinalistsDB)[batch][book2.title];
      const book1Rank = (finalistsDB as TFinalistsDB)[batch][book1.title];
      return book1Rank < book2Rank ? -1 : 1;
    });
  });

  cachedStore = store;

  return store;
}


export default () => createStore(bookDB);
