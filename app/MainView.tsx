'use client';
import {useMemo} from "react";
import {type TFilter, type TView} from './FilterView';
import createStore, { type TStore, TBook, TBookList } from "./store.tsx";
import BookView from "./BookView.tsx";

type TProps = {
    selectedFilter: TFilter,
    selectedView: TView,
};

type TLayout = {
  batchList: Array<string>,
  getBooks: (batch: string) => TBookList,
  highlight: Array<TBook['status']>,
};

export default function Main(props: TProps) {
  const store = useMemo<TStore>(createStore, []);

  let view: TLayout = useMemo(() => {
    if (props.selectedView === 'finalists') {
      return {
        batchList: Object.keys(store).filter(batch => store[batch].finalists.length),
        getBooks: (batch: string) => store[batch].finalists.filter((book: TBook) => bookFilter(book, book.blog, props.selectedFilter)),
        highlight: ['winner'],
      };
    } else {
      return {
        batchList: store[props.selectedView].blogs,
        getBooks: (batch: string) => store[props.selectedView].books.filter((book: TBook) => bookFilter(book, batch, props.selectedFilter)),
        highlight: ['winner', 'finalist'],
      };
    }
  }, [props.selectedView, props.selectedFilter]);

  return (
    <div role="list" className="mt-12 overflow-auto" style={{width: '90vw', marginLeft: '10vw'}}>
      {view.batchList.map(batch => (
        <div role="listitem" key={batch}>
          <h2 className="ml-8 mb-4 text-4xl">{batch.toUpperCase()}</h2>
          <div role="list" className="flex flex-row items-start overflow-auto">
            {view.getBooks(batch)
              .map((book: TBook) => <BookView key={book.title} book={book} highlight={view.highlight} />)
            }
          </div>
        </div>
      ))}
    </div>
  );
}

function bookFilter(book: TBook, blog: string, filter: TFilter): boolean {
  if (book.blog !== blog) {
      return false;
  }
  switch (filter) {
    case 'all':
      return true;
    case 'audio':
      return book.audiobook;
    case 'ku':
      return book.isKU;
  }
}
