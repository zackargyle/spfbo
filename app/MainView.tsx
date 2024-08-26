'use client';
import {useMemo} from "react";
import {type TFilter, type TView} from './FilterView';
import createStore, { type TStore, TBook, TBookList } from "./store.tsx";
import BookView from "./BookView.tsx";

type TProps = {
    selectedFilter: TFilter,
    selectedView: TView,
};

export default function Main(props: TProps) {
  const store = useMemo<TStore>(createStore, []);
  const groupings = useMemo(() => Object.keys(store[props.selectedView]).sort(), [props.selectedView]);

  return (
    <div role="list" className="mt-12 overflow-auto" style={{width: '90vw', marginLeft: '10vw'}}>
      {groupings.map(group => (
        <div role="listitem" key={group}>
          <h2 className="ml-8 mb-4 text-4xl">{group}</h2>
          <div role="list" className="flex flex-row items-start overflow-auto">
            {store[props.selectedView][group].map((book: TBook) => bookFilter(book, props.selectedFilter) ?
              <BookView
                key={book.title}
                book={book}
                highlight={book.status === 'winner' || (book.status === 'finalist' && props.selectedView !== 'finalists')}
              />
            : null)}
          </div>
        </div>
      ))}
    </div>
  );
}

function bookFilter(book: TBook, filter: TFilter) {
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
}
