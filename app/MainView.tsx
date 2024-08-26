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

  if (props.selectedView === 'finalists') {
    return (
      <BatchList data={Object.keys(store).filter(batch => store[batch].finalists.length > 0)}>
        {(batch: string) =>
          <BookList
            books={store[batch].finalists.filter(bookFilter(props.selectedFilter))}
            highlight={['winner']}
          />
        }
      </BatchList>
    );
  } else {
    return (
      <BatchList data={Object.keys(store[props.selectedView].blogs)}>
        {(blog) =>
          <BookList
            books={store[props.selectedView].blogs[blog].filter(bookFilter(props.selectedFilter))}
            highlight={['winner', 'finalist']}
          />
        }
      </BatchList>
    );
  }
}

type TBatchListProps = {
  data: Array<string>,
  children: (batch: string) => JSX.Element,
};

function BatchList({data, children}: TBatchListProps) {
  return (
    <div role="list" className="mt-12 overflow-auto" style={{width: '90vw', marginLeft: '10vw'}}>
      {data.map(batch => (
        <div role="listitem" key={batch}>
          <h2 className="ml-8 mb-4 text-4xl">{batch.toUpperCase()}</h2>
          {children(batch)}
        </div>
      ))}
    </div>
  );
}

type TBookListProps = {
  books: TBookList,
  highlight: Array<TBook['status']>,
};

function BookList({books, highlight}: TBookListProps) {
  return (
    <div role="list" className="flex flex-row items-start overflow-auto">
      {books.map((book: TBook) => <BookView key={book.title} book={book} highlight={highlight} />)}
    </div>
  );
}

function bookFilter( filter: TFilter) {
  return (book: TBook) =>  {
    switch (filter) {
      case 'all':
        return true;
      case 'ku':
        return book.isKU;
      case 'audio':
        return book.audiobook;
      default:
        return true;
    }
  };
}
