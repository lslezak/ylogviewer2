
import React, { useState } from "react";
import { OptionsMenu, OptionsMenuItem, OptionsMenuToggleWithText, OptionsMenuSeparator } from "@patternfly/react-core";
import CaretDownIcon from "@patternfly/react-icons/dist/esm/icons/caret-down-icon";

const labels = [
  "Debug",
  "Info",
  "Warning",
  "Error",
  "Security",
  "Internal"
];

export default function LogLevelFilter({ input, onChangeCallback }) {
  const [isOpen, setIsOpen] = useState(false);

  const onSelect = (level) => {
    const levels = [...input];
    levels[level] = !levels[level];
    if (onChangeCallback) onChangeCallback(levels);
  };

  const onSelectAll = (value) => {
    const levels = input.map(() => { return value });
    if (onChangeCallback) onChangeCallback(levels);
  };

  const menuItems = labels.map((label, index) => {
    return (
      <OptionsMenuItem
        onSelect={() => { onSelect(index) } }
        isSelected={input[index]}
        key={`log-level-${index}`}
      >
        {`${index} - ${label}`}
      </OptionsMenuItem>
    );
  });

  // add All/None items
  menuItems.push(<OptionsMenuSeparator key="separator" />);
  menuItems.push(<OptionsMenuItem onSelect={() => { onSelectAll(true) } } key="all">All</OptionsMenuItem>);
  menuItems.push(<OptionsMenuItem onSelect={() => { onSelectAll(false) } } key="none">None</OptionsMenuItem>);

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const toggle = <OptionsMenuToggleWithText toggleText="Log levels" toggleButtonContents={<CaretDownIcon />} onToggle={onToggle} />;

  return (
    <OptionsMenu
      menuItems={menuItems}
      isOpen={isOpen}
      isText
      toggle={toggle}
    />
  );
}
