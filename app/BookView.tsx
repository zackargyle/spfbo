'use client';
import { useMemo } from "react";
import { type TBook, TFinalistsDB } from "./store.tsx";
import finalistsDB from './finalists.json';

export type TStatus = 'none' | 'cut' | 'semi-finalist' | 'finalist' | 'winner';

type Props = {
    book: TBook,
    highlight: Array<TStatus>,
};

export default function Book({book, highlight}: Props) {
  const status = useMemo(() => getStatus(book), [book]);
  const label = useMemo(() => getLabel(status), [status]);
  return (
    <div role="listitem" className="relative mr-5 text-center h-row" >
      <a href={book.amazon} target="_blank" className="inline-block relative w-book">
      {highlight.includes(status) ? (
        <div className="absolute w-full h-full top-0 left-0 rounded border-solid border-4 border-green-400"></div>
      ) : null }
      <img width={120} height={180} alt={book.title} src={book.cover} className="rounded h-book" />
      {status === 'cut' ? (
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-65 rounded"></div>
      ) : null}
      </a>
      <div className="text-sm">{label}</div>
    </div>
  );
}

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

function getStatus(book: TBook) {
  if (book.isFinalist) {
    if (isWinner('spfbo-' + book.batch, book)) {
      return 'winner';
    } else {
      return 'finalist';
    }
  } else if (book.isSemiFinalist) {
    return 'semi-finalist';
  } else if (book.isCut) {
    return 'cut';
  } else {
    return 'none';
  }
}

function isWinner(batch: string, book: TBook) {
  return (finalistsDB as TFinalistsDB)[batch][book.title] === 1;
}
