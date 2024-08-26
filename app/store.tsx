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
      [group: string]: TBookList,
  },
};

let cachedStore: TStore | null = null;

function createStore(books: TBookList): TStore {
  if (cachedStore !== null) {
    return cachedStore;
  }
  const store: TStore = { finalists: {} };

  books.forEach((book: TBook) => {
    const batchKey = 'SPFBO ' + book.batch;
    store[batchKey] = store[batchKey] || {};
    let batch = store[batchKey];

    if (book.status === 'winner' || book.status === 'finalist') {
      store.finalists[batchKey] = store.finalists[batchKey] || [];
      store.finalists[batchKey].push(book);
    }

    if (!batch[book.blog]) {
      batch[book.blog] = [];
    }
    batch[book.blog].push(book);
  });

  // sort books and blogs for consistency
  Object.keys(store).forEach(batchKey => {
    const batch = store[batchKey];
    Object.keys(batch).forEach(blog => {
      const bookList = batch[blog];
      // Sort for default view
      bookList.sort((book1, book2) => {
        if (book1.rank < book2.rank) return -1;
        if (book2.rank < book1.rank) return 1;
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
    });
  });

  cachedStore = store;

  return store;
}


export default () => createStore(db);
