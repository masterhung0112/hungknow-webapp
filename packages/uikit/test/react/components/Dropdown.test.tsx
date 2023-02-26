import React from "react";
import { Dropdown } from "../../../src/react/components/Dropdown/Dropdown";
import { render } from "@testing-library/react";

describe("<Dropdown>", () => {
  const Menu = ({ ...props }) => (
    <Dropdown.Menu>
      {(menuProps, meta) => {
        const { show, hasShown } = meta;
        return (
          <div {...props} {...menuProps} data-show={show} className="menu" />
        );
      }}
    </Dropdown.Menu>
  );

  const Toggle = ({ ...props }) => (
    <Dropdown.Toggle>
      {(toggleProps) => (
        <button
          {...props}
          {...toggleProps}
          id="test-id"
          type="button"
          className="toggle"
        />
      )}
    </Dropdown.Toggle>
  );
  it("", () => {
    const {} = render(
      <Dropdown id="test-id">
        <div>
          <Toggle key="toggle">Child Title</Toggle>
          <Menu rootCloseEvent="mousedown">
            <button type="button">Item 1</button>
            <button type="button">Item 2</button>
          </Menu>
        </div>
      </Dropdown>
    );
  });
});
