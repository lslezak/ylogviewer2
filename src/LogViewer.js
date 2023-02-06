
import React from "react";
import { TextContent } from "@patternfly/react-core";

import "./LogViewer.scss";

const renderLine = (item, key, logLevels, properties, components) => {
  if (!logLevels[item.level] || !components[item.group]) return null;

  return (
    <div className={`logline loglevel-${item.level}`} key={`log-line-${key}`}>
      { properties.date && <span>{item.date}{" "}</span> }
      { properties.time && <span>{item.time}{" "}</span> }
      { properties.level && <span>{"<"}{item.level}{"> "}</span> }
      { properties.host && <span>{item.host}{" "}</span> }
      { properties.pid && <span>{"("}{item.pid}{") "}</span> }
      { properties.component && <span>{"["}{item.component}{"] "}</span> }
      { properties.location && <span>{item.location}{" "}</span> }
      { properties.message && <span className="important">{item.message}{" "}</span> }
    </div>
  );
};

const renderLines = (lines, logLevels, properties, components) => {
  const ret = [];

  while (lines.length > 0) {
    const line = lines.shift();

    const startGroup = line.message.match(/^::group::(\d+\.\d+)::(.*)/);
    if (startGroup) {
      ret.push(
        <details key={`group-start-${lines.length}`}>
          <summary className={`loglevel-${line.level}`}>{startGroup[2]}</summary>
          {renderLine(line, lines.length, logLevels, properties, components)}
          {renderLines(lines, logLevels, properties, components)}
        </details>
      );
    } else {
      ret.push(renderLine(line, lines.length, logLevels, properties, components));
    }

    const endGroup = line.message.match(/^::endgroup::(\d+\.\d+)::(.*)/);
    if (endGroup) {
      return ret;
    }
  }

  return ret;
};

export default function LogViewer({ data, levels, props, comps }) {
  const lines = renderLines([...data], levels, props, comps);

  return (
    <TextContent className="logview">
      {lines}
    </TextContent>
  );
}
