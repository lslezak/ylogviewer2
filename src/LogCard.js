
import React, { useState, useEffect } from "react";
import { Bullseye, Card, CardBody, CardHeader, CardTitle, FormGroup, Spinner } from "@patternfly/react-core";

import LogLevelFilter from "./LogLevelFilter";
import PropertyFilter from "./PropertyFilter";
import ComponentFilter from "./ComponentFilter";
import LogViewer from "./LogViewer";

import reader from "./reader";
import y2logparser from "./y2logparser";

// default displayed log properties
const defaultProperties = {
  date: false,
  time: true,
  level: false,
  host: false,
  pid: false,
  component: true,
  location: true,
  message: true
};

// convert component set to visibility mapping
const defaultComponents = (components) => {
  const ret = {};
  components.forEach((component) => { ret[component] = true });
  return ret;
};

// which log levels should be displayed by default, list of levels 0...5
const defaultLogLevels = [true, true, true, true, true, true];

export default function LogCard({ name, data }) {
  const [items, setItems] = useState(null);

  const [logLevels, setLogLevels] = useState(defaultLogLevels);
  const [properties, setProperties] = useState(defaultProperties);
  const [components, setComponents] = useState([]);

  const onLevelChangeCallback = (filter) => {
    // TODO: hide the elements using CSS, re-rendering of thousands of lines is expensive:
    // document.styleSheets[0].insertRule('.logline.loglevel-1{display:none}')
    // document.styleSheets[0].deleteRule(0)
    setLogLevels(filter);
  };

  const onAttributeChangeCallback = (props) => {
    setProperties(props);
  };

  const onComponentChangeCallback = (comps) => {
    setComponents(comps);
  };

  useEffect(() => {
    console.time("Unpacking data");
    reader({ data, name }).then(result => {
      console.timeEnd("Unpacking data");
      const parsed = y2logparser(result);
      // reset the filters
      setComponents(defaultComponents(parsed.components));
      setLogLevels(defaultLogLevels);
      setProperties(defaultProperties);
      // set new content
      setItems(parsed);
    });
  }, [data, name]);

  if (!items) {
    return (
      <Bullseye>
        <Spinner size="xl" />
      </Bullseye>
    );
  }

  return (
    <Card isFlat isRounded>
      <CardHeader>
        <CardTitle component="h2">
          {name}
        </CardTitle>
      </CardHeader>
      <CardBody>
        <FormGroup role="group" label="Filters">
          <LogLevelFilter input={logLevels} onChangeCallback={onLevelChangeCallback} />
          { " " }
          <PropertyFilter input={properties} onChangeCallback={onAttributeChangeCallback} />
          { " " }
          <ComponentFilter input={components} onChangeCallback={onComponentChangeCallback} />
        </FormGroup>
        <br />
        <LogViewer data={items.lines} levels={logLevels} props={properties} comps={components} />
      </CardBody>
    </Card>
  );
}
