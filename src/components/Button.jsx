import React from "react";
import "./Button.css";

export default (props) => {
  let classes = 'button '
classes += props.double ? "double" : " "
classes += props.triple ? "triple" : " "
classes += props.operation ? "operation" : " "
classes += props.equals ? "equals" : " "
   
  return (
      <button
        onClick={(e) => props.click && props.click(props.label)}
        className={classes}>{props.label}</button>
  );
};
