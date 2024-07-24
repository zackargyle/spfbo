'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import { list } from "@vercel/blob";

type Store = {
  [batch: string]: {
    blogs: Array<string>,
    books: BookList,
  }
};

type Book = {
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

function massageData(books: BookList): Store {
  const store: Store = {};

  books.forEach((book: Book) => {
    store[book.batch] = store[book.batch] || { blogs: [], books: [] };
    let batch = store[book.batch];

    batch.books.push(book);

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
      return 0;
    });
  });

  return store;
}


export default function Home() {
  const [store, setStore] = useState<Store>();
  const [selectedBatch, setSelectedBatch] = useState<string>('10');

  useEffect(() => {
    fetch("https://sof81sccysblftg6.public.blob.vercel-storage.com/spfbo-7-24-iu4AOoNBEnUz6cgIdtkZElrANnJpWp.json")
      .then(response => response.json())
      .then((bookList: BookList) => massageData(bookList))
      .then((store: Store) => setStore(store));
  },[]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <a style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
          <img src="https://cdn.prod.website-files.com/5ecfe69e4752d3ccbbe99d9d/6642b79fc3b65d5acfcb62c6_x.png" sizes="(max-width: 640px) 100vw, 640px" srcSet="https://cdn.prod.website-files.com/5ecfe69e4752d3ccbbe99d9d/6642b79fc3b65d5acfcb62c6_x-p-500.png 500w, https://cdn.prod.website-files.com/5ecfe69e4752d3ccbbe99d9d/6642b79fc3b65d5acfcb62c6_x.png 640w" alt="Self-Published Fantasy Blog-off" />
        </a>
        {store ? (
          <>
            <div style={{ display: 'flex', width: '100%', marginTop: 20, justifyContent: 'center'}}>
              {Object.keys(store).map(batch => (
                <button key={batch} onClick={() => setSelectedBatch(batch)} style={{ fontSize: 20, margin: '0 15px', color: selectedBatch === batch ? '#ed1c25' : 'white'}}>{`SPFBO ${batch}`}</button>
              ))}
            </div>
            <div role="list" style={{width: '90vw', marginLeft: '10vw', marginTop: 60, overflow: 'auto'}}>
              {store[selectedBatch].blogs.map(blog => (
                <div role="listitem" key={blog}>
                  <h2 style={{ marginLeft: '5vw', fontSize: 40, marginBottom: 10 }}>{blog}</h2>
                  <div role="list" style={{ flexDirection: 'row', alignItems: 'flex-start', height: 230, display: 'flex', overflow: 'auto' }}>
                    {store[selectedBatch].books.filter(book => book.blog === blog).map((book: Book, index: number) => (
                      <div role="listitem" key={book.title} style={{ height: 180, marginRight: 15, textAlign: 'center', fontSize: 14}}>
                        <a href={book.amazon} target="_blank" style={{ display: 'inline-block', width: 120, position: 'relative'}}>
                          {book.isFinalist ? (
                            <div style={{border: '4px solid #56ca56', borderRadius: 4, width: '100%', height: '100%', position: 'absolute', top: 0, left: 0}}></div>
                          ) : null}
                          <img loading={index < 10 ? 'eager' : 'lazy'} alt={book.title} src={book.cover} style={{borderRadius: 4, minWidth: '100%', height: 180}} />
                        </a>
                        {book.isFinalist ? (
                          <div>Finalist</div>
                        ) : null}
                        {book.isSemiFinalist && !book.isFinalist? (
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
