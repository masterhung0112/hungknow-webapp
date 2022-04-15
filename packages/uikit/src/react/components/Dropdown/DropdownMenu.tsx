import React from "react";

export const DropdownMenu: React.FC = ({ children }) => {
  return (
    <div>
      <span>Menu</span>
      {children}
    </div>
  );
};
