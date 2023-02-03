
import React, { useState } from "react";
import { OptionsMenu, OptionsMenuItem, OptionsMenuToggleWithText, OptionsMenuSeparator } from '@patternfly/react-core';
import CaretDownIcon from '@patternfly/react-icons/dist/esm/icons/caret-down-icon';

export default function LogLevelFilter({ input, onChangeCallback }) {
  const [logLevels, setLogLevels] = useState(input);
  const [isOpen, setIsOpen] = useState(false);

  const onSelect = (level) => {
    const levels = [...logLevels];
    levels[level] = !levels[level];
    setLogLevels(levels);
    if (onChangeCallback) onChangeCallback(levels);
  };

  const onSelectAll = (value) => {
    const levels = logLevels.map(() => { return value });
    setLogLevels(levels);
    if (onChangeCallback) onChangeCallback(levels);
  };

  const labels = [
    "Debug",
    "Info",
    "Warning",
    "Error",
    "Security",
    "Internal"
  ];

  const menuItems = labels.map((label, index) => {
    return (
      <OptionsMenuItem
        onSelect={() => { onSelect(index) } }
        isSelected={logLevels[index]}
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
