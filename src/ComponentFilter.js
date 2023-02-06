
import React, { useState } from "react";
import { OptionsMenu, OptionsMenuItem, OptionsMenuToggleWithText, OptionsMenuSeparator } from "@patternfly/react-core";
import CaretDownIcon from "@patternfly/react-icons/dist/esm/icons/caret-down-icon";

export default function ComponentFilter({ input, onChangeCallback }) {
  const [isOpen, setIsOpen] = useState(false);

  const onSelect = (component) => {
    const comps = { ...input };
    comps[component] = !comps[component];
    if (onChangeCallback) onChangeCallback(comps);
  };

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const onSelectAll = (value) => {
    const comps = {};
    Object.keys(input).forEach((key) => { comps[key] = value });
    if (onChangeCallback) onChangeCallback(comps);
  };

  // sort the component names alphabetically (depending on the current locale)
  const names = Object.keys(input)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

  const menuItems = names.map((label) => {
    return (
      <OptionsMenuItem
        onSelect={() => { onSelect(label) } }
        isSelected={input[label]}
        key={`log-cpt-${label}`}
      >
        {label}
      </OptionsMenuItem>
    );
  });

  // add All/None items
  menuItems.push(<OptionsMenuSeparator key="separator" />);
  menuItems.push(<OptionsMenuItem onSelect={() => { onSelectAll(true) } } key="all">All</OptionsMenuItem>);
  menuItems.push(<OptionsMenuItem onSelect={() => { onSelectAll(false) } } key="none">None</OptionsMenuItem>);

  const toggle = (
    <OptionsMenuToggleWithText
    toggleText="Components"
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
