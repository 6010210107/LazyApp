import React from "react";
import "./Logo.css";
const Logo = ({ size = "small", bold = true, newLine = false }) => {
  return (
    <>
      <div className="logo-container logo-font">
        <p
          className={`${size === "large" ? "logo-large" : ""} ${
            bold ? "logo-bold" : ""
          }`}
        >
          |_AZY APP{" "}
          <span className={`logo-font ${newLine ? "new-line" : ""}`}>
            /ᐠ "–ꞈ –ᐟ\
          </span>
        </p>
      </div>
    </>
  );
};

export default Logo;
