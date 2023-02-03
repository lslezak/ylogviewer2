
import React from "react";
import { Card, CardTitle, CardBody, CardHeader } from "@patternfly/react-core";

import InputFileSelection from "./InputFileSelection";
import InputUrlSelection from "./InputUrlSelection";

export default function InputSelectionCard({ dataCallback }) {
  return (
    <Card isFlat isRounded>
      <CardHeader>
        <CardTitle component="h2">
          Select the y2log file to display
        </CardTitle>
      </CardHeader>
      <CardBody>
        <InputFileSelection dataCallback={dataCallback} />
        <br />
        <InputUrlSelection dataCallback={dataCallback} />
      </CardBody>
    </Card>
  );
}
