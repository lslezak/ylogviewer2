
import React, { useState, useEffect } from "react";
import { Page,  PageSection, Text, TextContent, TextVariants } from "@patternfly/react-core";

import NotesCard from "./NotesCard";
import InputSelectionCard from "./InputSelectionCard";
import ArchiveViewer from "./ArchiveViewer";
import FirefoxWarning from "./FirefoxWarning";

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
      <Page>
        <PageSection>
          <TextContent>
            <Text component={TextVariants.h1}>YaST Log Viewer</Text>
          </TextContent>
        </PageSection>
        <PageSection>
          <FirefoxWarning/>
          <InputSelectionCard dataCallback={dataCallback}/>
        </PageSection>
        <PageSection>
          { state.name ?
            <ArchiveViewer data={state.data} name={state.name}/>
            :
            <NotesCard />
          }
        </PageSection>
      </Page>
    </>
  );
};
