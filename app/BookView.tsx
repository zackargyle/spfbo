import { type Book } from "./store.tsx";

type Props = {
    link: string,
    title: string,
    cover: string,
    status: 'none' | 'cut' | 'semi-finalist' | 'finalist',
};

export default function Book({link, title, cover, status}: Props) {
    return (
        <div role="listitem" className="relative mr-5 text-center h-row" >
            <a href={link} target="_blank" className="inline-block relative w-book">
            {status === 'finalist' ? (
                <div className="absolute w-full h-full top-0 left-0 rounded border-solid border-4 border-green-400"></div>
            ) : null}
            <img width={120} height={180} alt={title} src={cover} className="rounded h-book" />
            {status === 'cut' ? (
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-75 rounded"></div>
            ) : null}
            </a>

            {status === 'finalist' ? <div className="text-sm">Finalist</div> : null}
            {status === 'semi-finalist' ? <div className="text-sm">Semi-finalist</div> : null}
        </div>
    );
}
