'use client';
import { useEffect, useState } from "react";
import Filters, { type TFilter, TView } from "./FilterView.tsx";
import Main from "./MainView.tsx"

export default function Home() {
  const [selectedView, setSelectedView] = useState<TView>('spfbo-10');
  const [selectedFilter, setSelectedFilter] = useState<TFilter>('all');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:pt-14">
      <a className="flex justify-center w-full justify-center">
        <img src="https://cdn.prod.website-files.com/5ecfe69e4752d3ccbbe99d9d/6642b79fc3b65d5acfcb62c6_x.png" sizes="(max-width: 640px) 100vw, 640px" srcSet="https://cdn.prod.website-files.com/5ecfe69e4752d3ccbbe99d9d/6642b79fc3b65d5acfcb62c6_x-p-500.png 500w, https://cdn.prod.website-files.com/5ecfe69e4752d3ccbbe99d9d/6642b79fc3b65d5acfcb62c6_x.png 640w" alt="Self-Published Fantasy Blog-off" />
      </a>
      <Filters
        selectedView={selectedView}
        setSelectedView={setSelectedView}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <Main
        selectedView={selectedView}
        selectedFilter={selectedFilter}
      />
    </main>
  );
}
