
import React, { useState } from "react";
import { Alert, AlertActionCloseButton } from "@patternfly/react-core";

export default function FirefoxWarning() {
  const [isOpen, setIsOpen] = useState(true);

  const close = () => {
    setIsOpen(false);
  };

  const show = navigator.userAgent.match(/firefox/i);

  if (!show || !isOpen) return null;

  return (
    <>
      <Alert
        variant="warning"
        title="Tar archives not supported in FireFox"
        actionClose={<AlertActionCloseButton onClose={close} />}
      >
        <p>
          Due to a bug in the Tar library the *.tar.* archives cannot be
          processed properly in the FireFox browser.
          <br />
          Either use another browser or unpack the archive locally.
        </p>
      </Alert>
      <br />
    </>
  );
}
