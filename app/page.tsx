'use client';
import { useEffect, useState } from "react";
import { list } from "@vercel/blob";
import createStore, { type Store, Book } from "./store.tsx";
import BookView from "./BookView.tsx";

type View = 'finalists' | 'spfbo-1' | 'spfbo-2' | 'spfbo-3' | 'spfbo-4' | 'spfbo-5' | 'spfbo-6' | 'spfbo-7' | 'spfbo-8' | 'spfbo-9' | 'spfbo-10';
type Filter = 'all' | 'audio' | 'ku';

function bookFilter(book: Book, blog: string, filter: Filter): boolean {
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

export default function Home() {
  const [store, setStore] = useState<Store>();
  const [selectedView, setSelectedView] = useState<View>('spfbo-10');
  const [selectedFilter, setSelectedFilter] = useState<'all'|'audio'|'ku'>('all');

  useEffect(() => {
    setStore(createStore());
  },[]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:pt-14">
      <div>
        <a className="flex justify-center w-full justify-center">
          <img src="https://cdn.prod.website-files.com/5ecfe69e4752d3ccbbe99d9d/6642b79fc3b65d5acfcb62c6_x.png" sizes="(max-width: 640px) 100vw, 640px" srcSet="https://cdn.prod.website-files.com/5ecfe69e4752d3ccbbe99d9d/6642b79fc3b65d5acfcb62c6_x-p-500.png 500w, https://cdn.prod.website-files.com/5ecfe69e4752d3ccbbe99d9d/6642b79fc3b65d5acfcb62c6_x.png 640w" alt="Self-Published Fantasy Blog-off" />
        </a>
        {store ? (
          <>
            <div className="w-full text-center mt-4">
              <div className="mb-3">What books would you like to see?</div>
              <select value={selectedView} onChange={e => setSelectedView(e.target.value as View)} className="py-2 px-3 text-black text-sm rounded">
                <option value="finalists">All Finalists</option>
                <option value="spfbo-10">SPFBO 10</option>
                <option value="spfbo-9">SPFBO 9</option>
                <option value="spfbo-8">SPFBO 8</option>
                <option value="spfbo-7">SPFBO 7</option>
                <option value="spfbo-6">SPFBO 6</option>
                <option value="spfbo-5">SPFBO 5</option>
                <option value="spfbo-4">SPFBO 4</option>
                <option value="spfbo-3">SPFBO 3</option>
                <option value="spfbo-2">SPFBO 2</option>
                <option value="spfbo-1">SPFBO 1</option>
              </select>
            </div>
            <div className="flex flex-row justify-center mt-4">
              <div className="flex flex-row cursor-pointer items-center" onClick={() => setSelectedFilter('all')}>
                <div className={`rounded-full w-circle h-circle ${selectedFilter === 'all' ? 'bg-red-600' : 'bg-white'}`}></div>
                <div className="ml-2 mr-8">All</div>
              </div>
              <div className="flex flex-row cursor-pointer items-center" onClick={() => setSelectedFilter('audio')}>
                <div className={`rounded-full w-circle h-circle ${selectedFilter === 'audio' ? 'bg-red-600' : 'bg-white'}`}></div>
                <div className="ml-2 mr-8">Audio</div>
              </div>
              <div className="flex flex-row cursor-pointer items-center" onClick={() => setSelectedFilter('ku')}>
                <div className={`rounded-full w-circle h-circle ${selectedFilter === 'ku' ? 'bg-red-600' : 'bg-white'}`}></div>
                <div className="ml-2">KU</div>
              </div>
            </div>
            <div role="list" className="mt-12 overflow-auto" style={{width: '90vw', marginLeft: '10vw'}}>
              {renderView(selectedView, store, selectedFilter)}
            </div>
          </>
        ) : null}
      </div>
    </main>
  );
}

function renderView(selectedView: View, store: Store, selectedFilter: Filter) {
  if (selectedView === 'finalists') {
    return (
      <div>
        {Object.keys(store).filter(batch => store[batch].finalists.length).map(batch => (
          <>
            <div className="ml-8 mb-4 text-4xl">{batch.toUpperCase()}</div>
            <div role="list" className="flex flex-row items-start overflow-auto">
              {store[batch].finalists
                .map((book: Book) => <BookView key={book.title} link={book.amazon} cover={book.cover} title={book.title} status="none" />)}
            </div>
          </>
        ))}
      </div>
    );
  } else {
    return store[selectedView].blogs.map(blog => (
      <div role="listitem" key={blog}>
        <h2 className="ml-8 mb-4 text-4xl">{blog}</h2>
        <div role="list" className="flex flex-row items-start overflow-auto">
          {store[selectedView].books
            .filter(book=> bookFilter(book, blog, selectedFilter))
            .map((book: Book) => <BookView key={book.title} link={book.amazon} cover={book.cover} title={book.title} status={getStatus(book)} />)

          }
        </div>
      </div>
    ));
  }
}

function getStatus(book: Book) {
  if (book.isFinalist) {
    return 'finalist';
  } else if (book.isSemiFinalist) {
    return 'semi-finalist';
  } else if (book.isCut) {
    return 'cut';
  } else {
    return 'none';
  }
}
