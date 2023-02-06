
import React, { useState } from "react";
import { Button, ButtonVariant, FormGroup, InputGroup, Text, TextInput, HelperText, HelperTextItem, ValidatedOptions } from "@patternfly/react-core";

const isValid = (url) => {
  try {
    const protocol = new URL(url).protocol;
    return protocol === "http:" || protocol === "https:";
  } catch (e) {
    return false;
  }
};

// initialize the log location from the URL search parameters
const initialUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("log") || "";
};

export default function InputUrlSelection({ dataCallback }) {
  const [value, setValue] = useState(initialUrl);
  const [loading, setIsLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  const onChange = (url) => {
    setValue(url);
    setFailed(false);
  };

  const onClearButtonClick = () => {
    // change to empty value
    onChange("");
  };

  const load = () => {
    setIsLoading(true);
    setFailed(false);

    window.fetch(value)
      .then(response => {
        if (!response.ok) {
          console.error(response);
          throw new Error("Download failed");
        }

        if (value.match(/\.(t?gz|xz|bz2|tar)$/i)) {
          return response.arrayBuffer();
        } else {
          return response.text();
        }
      })
      .then(buffer => {
        console.log("Downloaded ", buffer.byteLength);
        dataCallback(buffer, value);
      })
      .catch(error => {
        console.error(error);
        setFailed(true);
      })
      .finally(() => { setIsLoading(false) });
  };

  const valid = isValid(value);
  const displayError = (!valid && value !== "");
  const validState = value === "" ? null : (valid ? ValidatedOptions.success : ValidatedOptions.error);

  return (
    <>
      <FormGroup role="group" label="Remote file">
        <InputGroup>
          <TextInput
              value={value}
              onChange={onChange}
              isDisabled={loading}
              type="url"
              placeholder="HTTP URL"
              aria-label="URL of a remote log file"
              validated={validState}
          />
          <Button
            variant={ButtonVariant.control}
            isDisabled={value === "" || loading}
            onClick={onClearButtonClick}
          >
            Clear
          </Button>
        </InputGroup>
        <InputGroup>
          { displayError &&
            <HelperText>
              <HelperTextItem variant="error" hasIcon>
                Invalid URL
              </HelperTextItem>
            </HelperText>}
          { failed &&
            <HelperText>
              <HelperTextItem variant="error" hasIcon>
                Download failed
              </HelperTextItem>
            </HelperText>}
          {/* append non breaking space to keep constant height of the error placeholder */}
          <Text component="span">{"\u00A0"}</Text>
        </InputGroup>
        <Button onClick={load} isLoading={loading} isDisabled={!valid || value === "" || loading} variant="primary" icon="">Load URL</Button>
      </FormGroup>
    </>
  );
}
