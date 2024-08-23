'use client';
import db from './db.json';

export type TStatus = 'none' | 'cut' | 'semi-finalist' | 'finalist' | 'winner';

export type TBook = {
    batch: number,
    title: string,
    author: string,
    cover: string,
    amazon: string,
    audiobook: boolean,
    blog: string,
    isKU: boolean,
    status: TStatus | string,
    rank: number,
};

export type TBookList = Array<TBook>;

export type TStore = {
  [batch: string]: {
      blogs: Array<string>,
      books: TBookList,
      finalists: TBookList,
  },
};

let cachedStore: TStore | null = null;

function createStore(books: TBookList): TStore {
  if (cachedStore !== null) {
    return cachedStore;
  }
  const store: TStore = {};

  books.forEach((book: TBook) => {
    const batchKey = 'spfbo-' + book.batch;
    store[batchKey] = store[batchKey] || { blogs: [], books: [], finalists: [] };
    let batch = store[batchKey];

    batch.books.push(book);

    if (book.status === 'winner' || book.status === 'finalist') {
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
      if (book1.status === 'winner') return -1;
      if (book2.status === 'winner') return 1;
      if (book1.status === 'finalist') return -1;
      if (book2.status === 'finalist') return 1;
      if (book1.status === 'semi-finalist') return -1;
      if (book2.status === 'semi-finalist') return 1;
      if (book1.status === 'cut') return 1;
      if (book2.status === 'cut') return -1;
      return 0;
    });

    store[batch].finalists.sort((book1, book2) => {
      return book2.rank > book1.rank ? -1 : 1;
    });
  });

  cachedStore = store;

  return store;
}


export default () => createStore(db);
