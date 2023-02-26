import React from "react";

export const DropdownHeader: React.FC = ({ children }) => {
  return (
    <div>
      <span>header</span>
      {children}
    </div>
  );
};
