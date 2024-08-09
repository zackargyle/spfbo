'use client';
import { useEffect, useState } from "react";
import { list } from "@vercel/blob";
import createStore, { type Store, Book } from "./store.tsx";

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
  const [selectedBatch, setSelectedBatch] = useState<string>('10');
  const [selectedFilter, setSelectedFilter] = useState<'all'|'audio'|'ku'>('all');

  useEffect(() => {
    setStore(createStore());
  },[]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <a className="flex justify-center w-full justify-center">
          <img src="https://cdn.prod.website-files.com/5ecfe69e4752d3ccbbe99d9d/6642b79fc3b65d5acfcb62c6_x.png" sizes="(max-width: 640px) 100vw, 640px" srcSet="https://cdn.prod.website-files.com/5ecfe69e4752d3ccbbe99d9d/6642b79fc3b65d5acfcb62c6_x-p-500.png 500w, https://cdn.prod.website-files.com/5ecfe69e4752d3ccbbe99d9d/6642b79fc3b65d5acfcb62c6_x.png 640w" alt="Self-Published Fantasy Blog-off" />
        </a>
        {store ? (
          <>
            <div className="flex w-full justify-center mt-5">
              {Object.keys(store).map(batch => (
                <button key={batch} onClick={() => setSelectedBatch(batch)} className={`text-xl mx-4 ${selectedBatch === batch ? 'text-red-600' : 'text-white'}`}>{`SPFBO ${batch}`}</button>
              ))}
            </div>
            <div className="flex flex-row justify-center mt-8">
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
            <div role="list" className="mt-14 overflow-auto" style={{width: '90vw', marginLeft: '10vw'}}>
              {store[selectedBatch].blogs.map(blog => (
                <div role="listitem" key={blog}>
                  <h2 className="ml-8 mb-5 text-5xl">{blog}</h2>
                  <div role="list" className="flex flex-row items-start overflow-auto">
                    {store[selectedBatch].books.filter(book=> bookFilter(book, blog, selectedFilter)).map((book: Book, index: number) => (
                      <div role="listitem" key={book.title} className="relative mr-5 text-center font-sm h-row" >
                        <a href={book.amazon} target="_blank" className="inline-block relative w-book">
                          {book.isFinalist ? (
                            <div className="absolute w-full h-full top-0 left-0 rounded border-solid border-4 border-green-400"></div>
                          ) : null}
                          <img width={120} height={180} alt={book.title} src={book.cover} className="rounded h-book" />
                          {book.isCut ? (
                            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-75 rounded"></div>
                          ) : null}
                        </a>

                        {book.isFinalist ? (
                          <div >Finalist</div>
                        ) : null}

                        {book.isSemiFinalist && !book.isFinalist ? (
                          <div >Semi-finalist</div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </main>
  );
}
