
import React, { useState } from "react";
import { OptionsMenu, OptionsMenuItem, OptionsMenuToggleWithText, OptionsMenuSeparator } from "@patternfly/react-core";
import CaretDownIcon from "@patternfly/react-icons/dist/esm/icons/caret-down-icon";

export default function AttributeFilter({ input, onChangeCallback }) {
  const [isOpen, setIsOpen] = useState(false);

  const onSelect = (key) => {
    const attrs = { ...input };
    attrs[key] = !attrs[key];
    if (onChangeCallback) onChangeCallback(attrs);
  };

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const onSelectAll = (value) => {
    const attrs = {};
    Object.keys(input).forEach((key) => { attrs[key] = value });
    if (onChangeCallback) onChangeCallback(attrs);
  };

  const labels = {
    date: "Date",
    time: "Time",
    level: "Log level",
    host: "Host name",
    pid: "Process ID",
    component: "Component",
    location: "Location",
    message: "Message"
  };

  const menuItems = [];

  for (const [key, label] of Object.entries(labels)) {
    menuItems.push(
      <OptionsMenuItem
        onSelect={() => { onSelect(key) } }
        isSelected={input[key]}
        key={`log-attr-${key}`}
      >
        {label}
      </OptionsMenuItem>
    );
  }

  // add All/None items
  menuItems.push(<OptionsMenuSeparator key="separator" />);
  menuItems.push(<OptionsMenuItem onSelect={() => { onSelectAll(true) } } key="all">All</OptionsMenuItem>);
  menuItems.push(<OptionsMenuItem onSelect={() => { onSelectAll(false) } } key="none">None</OptionsMenuItem>);

  const toggle = (
    <OptionsMenuToggleWithText
    toggleText="Log properties"
    toggleButtonContents={<CaretDownIcon />}
    onToggle={onToggle}
    />
  );

  return (
    <OptionsMenu
      menuItems={menuItems}
      isOpen={isOpen}
      isText
      toggle={toggle}
    />
  );
}
