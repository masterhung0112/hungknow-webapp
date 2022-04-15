import React from "react";

export const DropdownItem: React.FC = ({ children }) => {
  return (
    <div>
      <span>Item</span>
      {children}
    </div>
  );
};
