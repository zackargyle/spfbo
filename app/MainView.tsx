'use client';
import {useMemo} from "react";
import {type TFilter, type TView} from './FilterView';
import createStore, { type TStore, TBook, TFinalistsDB } from "./store.tsx";
import BookView from "./BookView.tsx";

type TProps = {
    selectedFilter: TFilter,
    selectedView: TView,
};

export default function Main(props: TProps) {
  const store = useMemo<TStore>(createStore, []);

  let view = null;

  if (props.selectedView === 'finalists') {
    view = (
      <div>
        {Object.keys(store).filter(batch => store[batch].finalists.length).map(batch => (
          <>
            <div className="ml-8 mb-4 text-4xl">{batch.toUpperCase()}</div>
            <div role="list" className="flex flex-row items-start overflow-auto">
              {store[batch].finalists
                .filter(book=> bookFilter(book, book.blog, props.selectedFilter))
                .map((book: TBook) => <BookView key={book.title} book={book} highlight={['winner']} />)}
            </div>
          </>
        ))}
      </div>
    );
  } else {
    view = store[props.selectedView].blogs.map(blog => (
      <div role="listitem" key={blog}>
        <h2 className="ml-8 mb-4 text-4xl">{blog}</h2>
        <div role="list" className="flex flex-row items-start overflow-auto">
          {store[props.selectedView].books
            .filter(book=> bookFilter(book, blog, props.selectedFilter))
            .map((book: TBook) => <BookView key={book.title} book={book} highlight={['winner', 'finalist']} />)
          }
        </div>
      </div>
    ));
  }

  return (
    <div role="list" className="mt-12 overflow-auto" style={{width: '90vw', marginLeft: '10vw'}}>
      {view}
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
