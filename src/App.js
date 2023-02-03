
import React, { useState, useEffect } from "react";

import NotesCard from "./NotesCard";
import InputSelectionCard from "./InputSelectionCard";
import PageHeader from "./PageHeader";
import ArchiveViewer from "./ArchiveViewer";

import "./App.css";

const initialState = {
  name: null,
  data: null,
};

export default function App() {
  const [state, setState] = useState(initialState);

  const dataCallback = (data, name) => {
    console.log("Loaded data from", name);
    setState({...state, data, name })

    // update the page URL to allow sharing the link
    let location_url = new URL(window.location);
    let search_params = location_url.searchParams;

    if (name.match(/^https?:\/\//))
      search_params.set("log", name);
    else
      search_params.delete("log");

    window.history.pushState("", "", location_url);
  };

  console.log("rendering ", state);

  return (
    <>
      <header>
        <PageHeader/>
      </header>
      <main>
        <InputSelectionCard dataCallback={dataCallback}/>
        <br />
        { state.name ?
          <ArchiveViewer data={state.data} name={state.name}/>
          :
          <NotesCard />
        }
      </main>
    </>
  );
};
