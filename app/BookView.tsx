'use client';
import { memo } from "react";
import { type TBook, TStatus } from "./store.tsx";

type Props = {
    book: TBook,
    highlight: boolean,
};

export default memo(function Book({book, highlight}: Props) {
  return (
    <div role="listitem" className="relative mr-5 text-center h-row" >
      <a href={book.amazon} target="_blank" className="inline-block relative w-book">
      {highlight ? (
        <div className="absolute w-full h-full top-0 left-0 rounded border-solid border-4 border-green-400"></div>
      ) : null }
      <img width={120} height={180} alt={book.title} src={book.cover} className="rounded h-book" />
      {book.status === 'cut' ? (
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-65 rounded"></div>
      ) : null}
      </a>
      <div className="text-sm capitalize">{getLabel(book.status)}</div>
    </div>
  );
});

function getLabel(status: string) {
  switch (status) {
    case 'winner':
      return 'Winner';
    case 'finalist':
        return 'Finalist';
    case 'semi-finalist':
      return 'Semi-finalist';
    default:
        return '';
  }
}
