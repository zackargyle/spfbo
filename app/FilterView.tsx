'use client';
export type TFilter = 'all'|'audio'|'ku';
export type TView = 'finalists' | 'spfbo-1' | 'spfbo-2' | 'spfbo-3' | 'spfbo-4' | 'spfbo-5' | 'spfbo-6' | 'spfbo-7' | 'spfbo-8' | 'spfbo-9' | 'spfbo-10';

type TProps = {
    selectedFilter: TFilter,
    setSelectedFilter: (filter: TFilter) => void,
    selectedView: TView,
    setSelectedView: (view: TView) => void,
};

export default function Filters(props: TProps) {
  return (
    <>
      <div className="w-full text-center mt-4">
        <div className="mb-3">What books would you like to see?</div>
        <select value={props.selectedView} onChange={e => props.setSelectedView(e.target.value as TView)} className="py-2 px-3 text-black text-sm rounded">
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
        <div className="flex flex-row cursor-pointer items-center" onClick={() => props.setSelectedFilter('all')}>
          <div className={`rounded-full w-circle h-circle ${props.selectedFilter === 'all' ? 'bg-red-600' : 'bg-white'}`}></div>
          <div className="ml-2 mr-8">All</div>
        </div>
        <div className="flex flex-row cursor-pointer items-center" onClick={() => props.setSelectedFilter('audio')}>
          <div className={`rounded-full w-circle h-circle ${props.selectedFilter === 'audio' ? 'bg-red-600' : 'bg-white'}`}></div>
          <div className="ml-2 mr-8">Audio</div>
        </div>
        <div className="flex flex-row cursor-pointer items-center" onClick={() => props.setSelectedFilter('ku')}>
          <div className={`rounded-full w-circle h-circle ${props.selectedFilter === 'ku' ? 'bg-red-600' : 'bg-white'}`}></div>
          <div className="ml-2">KU</div>
        </div>
      </div>
    </>
  );
}
