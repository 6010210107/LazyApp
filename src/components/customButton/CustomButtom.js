import React from "react";
import "./CustomButton.css";
import { Button } from "react-bootstrap";

const CustomButtom = ({
  btnVariant = "primary",
  btnSize = "",
  btnText = "Button",
  btnFn = null
}) => {
  return (
    <>
      <Button variant={btnVariant} size={btnSize} onClick={btnFn}>
        {btnText}
      </Button>
    </>
  );
};

export default CustomButtom;
