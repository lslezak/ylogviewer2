
import React, { useState } from "react";
import { Card, CardHeader, Page, PageSection, Text, TextContent, TextVariants } from "@patternfly/react-core";

import FirefoxWarning from "./FirefoxWarning";
import InputSelectionCard from "./InputSelectionCard";
import LogCard from "./LogCard";
import NotesCard from "./NotesCard";

import "./App.css";

const initialState = {
  name: null,
  data: null,
};

export default function App() {
  const [state, setState] = useState(initialState);

  const dataCallback = (data, name) => {
    console.log("Loaded data from", name);
    setState({ ...state, data, name });

    // update the page URL to allow sharing the link
    const location_url = new URL(window.location);
    const search_params = location_url.searchParams;

    if (name.match(/^https?:\/\//))
      search_params.set("log", name);
    else
      search_params.delete("log");

    window.history.pushState("", "", location_url);
  };

  return (
    <>
      <Page>
        <PageSection>
          <Card>
            <CardHeader>
              <TextContent>
                <Text component={TextVariants.h1}>YaST Log Viewer</Text>
              </TextContent>
            </CardHeader>
          </Card>
        </PageSection>
        <PageSection>
          <FirefoxWarning />
          <InputSelectionCard dataCallback={dataCallback} />
        </PageSection>
        <PageSection>
          { state.name
            ? <LogCard data={state.data} name={state.name} />
            : <NotesCard />}
        </PageSection>
      </Page>
    </>
  );
}
