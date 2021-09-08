import React from "react";

const Header = ({contentHeader = "No content"}) => {
  return (
    <div>
      <div className="content-header shadow-none">
        <h1>{contentHeader}</h1>
      </div>
    </div>
  );
};

export default Header;
