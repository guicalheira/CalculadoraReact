import React from "react";
import"./Display.css";
export default props=>{
  let classes = 'display '
classes += props.menor ? "menor" : " "
classes += props.maior ? "maior" : " "

    return(
     
        <div  className={classes}>
        {props.value} {props.elder}
        </div>
    )
}