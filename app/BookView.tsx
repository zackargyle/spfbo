import { type Book } from "./store.tsx";

type Props = {
    link: string,
    title: string,
    cover: string,
    status: 'none' | 'cut' | 'semi-finalist' | 'finalist' | 'winner',
};

function getText(status: string) {
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

export default function Book({link, title, cover, status}: Props) {
    return (
        <div role="listitem" className="relative mr-5 text-center h-row" >
            <a href={link} target="_blank" className="inline-block relative w-book">
            {status === 'winner' || status === 'finalist' ? (
                <div className="absolute w-full h-full top-0 left-0 rounded border-solid border-4 border-green-400"></div>
            ) : null}
            <img width={120} height={180} alt={title} src={cover} className="rounded h-book" />
            {status === 'cut' ? (
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-65 rounded"></div>
            ) : null}
            </a>
            <div className="text-sm">{getText(status)}</div>
        </div>
    );
}
